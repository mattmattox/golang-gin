package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// Joke contains information about a single Joke
type Server struct {
	ID        int    `json:"id" binding:"required"`
	Heartbeat int    `json:"heartbeat"`
	Hostname  string `json:"hostname" binding:"required"`
}

// We'll create a list of jokes
var servers = []Server{
	Server{1, 0, "z1ubdb01.support.local"},
	Server{2, 0, "z1ubweb01.support.local"},
	Server{3, 0, "z1ubweb02.support.local"},
}

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	api.GET("/server", ServerHandler)
	api.POST("/server/heartbeat/:serverID", ServerHeartbeat)

	// Start and run the server
	router.Run(":8000")
}

func ServerHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, servers)
}

// ServerHeartbeat increments the likes of a particular server
func ServerHeartbeat(c *gin.Context) {
	// confirm server ID sent is valid
	// remember to import the `strconv` package
	if serverid, err := strconv.Atoi(c.Param("serverID")); err == nil {
		// find server, and increment heartbeat
		for i := 0; i < len(servers); i++ {
			if servers[i].ID == serverid {
				servers[i].Heartbeat += 1
			}
		}
		// return a pointer to the updated jokes list
		c.JSON(http.StatusOK, &servers)
	} else {
		// Server ID is invalid
		c.AbortWithStatus(http.StatusNotFound)
	}
}
