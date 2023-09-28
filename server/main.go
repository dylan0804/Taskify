package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

type Todo struct {
	ID          string `json:"id"`
	Todo        string `json:"todo"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
	Priority    string `json:"priority"`
	Category    string `json:"category"`
	User_email  string `json:"user_email"`
}

type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password []byte `json:"password"`
}

var db *sql.DB

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))

	todos := []Todo{}

	setupDatabase()

	app.Get("/api/todos/:email", func(c *fiber.Ctx) error {

		todos = nil

		userEmail := c.Params("email")

		query := "SELECT id, todo, description, done, priority, category FROM todos WHERE user_email = ? ORDER BY created_at DESC"
		rows, err := db.Query(query, userEmail)
		if err != nil {
			log.Printf("Error executing query: %v", err)
			return c.Status(http.StatusInternalServerError).SendString("Internal Server Error")
		}
		defer rows.Close()

		for rows.Next() {
			var todo Todo
			err = rows.Scan(&todo.ID, &todo.Todo, &todo.Description, &todo.Done, &todo.Priority, &todo.Category)
			if err != nil {
				log.Printf("Error scanning row: %v", err)
				return c.Status(http.StatusInternalServerError).SendString("Internal Server Error")
			}
			todos = append(todos, todo)
		}
		return c.JSON(todos)
	})

	app.Post("/", func(c *fiber.Ctx) error {
		todos = nil

		todo := &Todo{}

		if err := c.BodyParser(&todo); err != nil {
			log.Printf("Error parsing request body")
		}

		todos = append(todos, *todo)

		// Your code to insert data into the database using the username
		// Example: Insert the username into the 'users' table
		_, err := db.Exec("INSERT INTO todos (id, todo, description, done, priority, category, user_email) VALUES (?, ?, ?, ?, ?, ?, ?)", todo.ID, todo.Todo, todo.Description, todo.Done, todo.Priority, todo.Category, todo.User_email)
		if err != nil {
			// Handle the error (e.g., return an error response)
			return err
		}

		return c.JSON(todos)
	})

	app.Patch("/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		_, err := db.Exec("UPDATE todos SET done = ? WHERE id = ?", true, id)
		if err != nil {
			// Handle the error (e.g., return an error response)
			panic(err.Error())
		}

		// Create a new slice to hold non-done todos
		var updatedTodos []Todo

		// Loop through todos and add non-done todos to the updated slice
		for _, t := range todos {
			if t.ID == id {
				t.Done = true
			}
			if !t.Done {
				updatedTodos = append(updatedTodos, t)
			}
		}
		// Update the todos slice with the filtered list
		todos = updatedTodos

		return c.JSON(todos)
	})

	app.Post("/api/register", func(c *fiber.Ctx) error {
		var data map[string]string

		if err := c.BodyParser(&data); err != nil {
			return err
		}

		// Check if a user with the same email already exists
		err := db.QueryRow("SELECT * FROM users WHERE email = ?", data["email"])
		if err == nil {
			// User with the same email already exists, return an error response
			return c.JSON(fiber.Map{
				"message": "User already exists!",
			})
		}

		// If no existing user with the same email, proceed with registration
		password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

		user := User{
			Name:     data["name"],
			Email:    data["email"],
			Password: password,
		}

		_, ok := db.Exec("INSERT INTO users (email, name, password) VALUES (?, ?, ?)", user.Email, user.Name, user.Password)

		if ok != nil {
			return ok
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Post("/api/login", func(c *fiber.Ctx) error {
		var data map[string]string

		if err := c.BodyParser(&data); err != nil {
			return err
		}

		var user User

		// Define the SQL query to retrieve the user by email
		query := "SELECT email, name, password FROM users WHERE email = ?"

		// Execute the query
		row := db.QueryRow(query, data["email"])

		// Scan the query result into the user struct
		err := row.Scan(&user.Email, &user.Name, &user.Password)

		if err != nil {
			return err
		}

		if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": "incorrect password",
			})
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
			Issuer:    user.Email,
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})

		token, err := claims.SignedString([]byte(SecretKey))

		if err != nil {
			return err
		}

		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: true,
		}

		c.Cookie(&cookie)

		return c.JSON(fiber.Map{
			"message": "success",
		})

	})

	app.Get("/api/user", func(c *fiber.Ctx) error {
		// Get the JWT token from the cookie
		cookie := c.Cookies("jwt")

		// Parse and validate the JWT token
		token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		})

		if err != nil {
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid token")
		}

		// Check if the token is valid
		if !token.Valid {
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid token")
		}

		// Retrieve the claims from the token and assert as *jwt.StandardClaims
		claims, ok := token.Claims.(*jwt.StandardClaims)
		if !ok {
			return fiber.NewError(fiber.StatusInternalServerError, "Failed to retrieve claims")
		}

		// Create a user struct to store the result
		var user User

		// Define the SQL query to retrieve the user by email
		query := "SELECT email, name FROM users WHERE email = ?"

		// Execute the query
		row := db.QueryRow(query, claims.Issuer)

		// Scan the query result into the user struct
		err = row.Scan(&user.Email, &user.Name)

		if err != nil {
			return err // Handle the error (e.g., user not found)
		}

		// Return the user data as JSON
		return c.JSON(user)
	})

	app.Post("/api/logout", func(c *fiber.Ctx) error {
		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HTTPOnly: true,
		}
		c.Cookie(&cookie)

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Listen(":8080")
}

func setupDatabase() {
	var err error
	db, err = sql.Open("mysql", "someuser:somepassword@tcp(127.0.0.1:3306)/testdb")
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	fmt.Println("Connected to MySQL")
}
