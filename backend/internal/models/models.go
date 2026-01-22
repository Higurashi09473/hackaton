package models

type Statement struct {
	StatementUID int    `json:"id"`
	Source       string `json:"source" validate:"required"`
	District     string `json:"district" validate:"required"`
	Category     string `json:"category" validate:"required"`
	Subcategory  string `json:"subcategory" validate:"required"`
	CreatedAt    string `json:"created_at"`
	Status       string `json:"status" validate:"required"`
	AdminStatus  bool `json:"admin_status"`
	Description  string `json:"description" validate:"required,min=10"`
}
