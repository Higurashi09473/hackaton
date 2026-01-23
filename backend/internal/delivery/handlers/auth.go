package handlers

import (
	"encoding/json"
	"fmt"

	"log/slog"
	"net/http"
	"time"

	resp "hack/internal/lib/api/response"
	"hack/internal/lib/logger/sl"

	// "hack/internal/storage"

	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/jwtauth/v5"
	"github.com/go-chi/render"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(log *slog.Logger, tokenAuth *jwtauth.JWTAuth) http.HandlerFunc { // Добавь storage, если нужно проверять по БД
	return func(w http.ResponseWriter, r *http.Request) {
		const op = "handlers.auth.Login"
		log := log.With(
			slog.String("op", op),
			slog.String("request_id", middleware.GetReqID(r.Context())),
		)

		var req LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			log.Error("failed to decode request", sl.Err(err))
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}
		fmt.Println(req.Password, req.Username)

		// Проверка credentials (hardcoded для примера; в реальности — из БД с хэшированием паролей, например bcrypt)
		if req.Username != "admin" || req.Password != "password"{
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, resp.Error("Internal error"))
			return
		}

		exp := time.Now().Add(24 * time.Hour)

		// Создай claims с ролью
		claims := map[string]interface{}{
			"username": req.Username,
			"exp":     exp,
		}

		_, tokenString, err := tokenAuth.Encode(claims)

		if err != nil {
			log.Error("failed to generate token", sl.Err(err))
			w.WriteHeader(http.StatusInternalServerError)
			render.JSON(w, r, resp.Error("Internal error"))
			return
		}

		// Возвращаем токен
		w.Header().Set("Content-Type", "application/json")
		http.SetCookie(w, &http.Cookie{
			Name:     "jwt",
			Value:    tokenString,
			Expires:  exp,
			Secure:   true,
			HttpOnly: true,
			SameSite: http.SameSiteNoneMode,
			Path:     "/",
		})
		// json.NewEncoder(w).Encode(map[string]string{
		// 	"token": tokenString,
		// })
		w.WriteHeader(http.StatusOK)
		render.JSON(w, r, resp.OK())
	}
}