package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type User struct {
	Name string `json:"name"`
}

var db *sql.DB

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	setupDatabase()

	app.Get("/", func(c *fiber.Ctx) error {
		query := "SELECT username FROM users"
		rows, err := db.Query(query)
		if err != nil {
			log.Printf("Error executing query: %v", err)
			return c.Status(http.StatusInternalServerError).SendString("Internal Server Error")
		}
		defer rows.Close()

		users := []User{}

		for rows.Next() {
			var user User
			err = rows.Scan(&user.Name)
			if err != nil {
				log.Printf("Error scanning row: %v", err)
				return c.Status(http.StatusInternalServerError).SendString("Internal Server Error")
			}
			users = append(users, user)
		}
		return c.JSON(users)
	})

	app.Post("/", func(c *fiber.Ctx) error {
		user := &User{}

		if err := c.BodyParser(&user); err != nil {
			log.Printf("Error parsing request body")
		}

		users := []User{}

		users = append(users, *user)

		// Your code to insert data into the database using the username
		// Example: Insert the username into the 'users' table
		_, err := db.Exec("INSERT INTO users (username) VALUES (?)", user.Name)
		if err != nil {
			// Handle the error (e.g., return an error response)
			return err
		}

		return c.JSON(users)
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
