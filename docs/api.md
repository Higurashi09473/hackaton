# GET /api/analitic/categories -> возвращает мапу со структурой типа:
```
{
    "Благоустройство": 1040,
    "ЖКХ": 1224,
    "Мусор": 1225,
    "Освещение": 1144,
    "Парковки": 1088,
    "Транспорт": 1232,
    "Шум": 1048
}
```

# GET /api/statement -> Возвращает все заявления в виде массива
```
[
  {
    "id": 1,
    "source": "Городской портал",
    "district": "Выборгский",
    "category": "Мусор",
    "subcategory": "Переполненные контейнеры",
    "created_at": "2023-12-09",
    "status": "Решено",
    "description": "Обращение по теме: переполненные контейнеры"
  },
  {
    "id": 2,
    "source": "Городской портал",
    "district": "Петроградский",
    "category": "Мусор",
    "subcategory": "Несвоевременный вывоз",
    "created_at": "2024-12-06",
    "status": "В работе",
    "description": "Обращение по теме: несвоевременный вывоз"
  },
  ...
]
```

# GET /api/statement/{id} -> Возвращает заявление по id
```
{
    "id": {id},
    "source": "Городской портал",
    "district": "Выборгский",
    "category": "Мусор",
    "subcategory": "Переполненные контейнеры",
    "created_at": "2023-12-09",
    "status": "Решено",
    "description": "Обращение по теме: переполненные контейнеры"
}
```

# POST /api/statement -> Создает в БД новое заявление
### ожидает структуру:
```
type Statement struct {
	StatementUID int    `json:"id" validate:"required,gte=1"`
	Source       string `json:"source" validate:"required"`
	District     string `json:"district" validate:"required"`
	Category     string `json:"category" validate:"required"`
	Subcategory  string `json:"subcategory" validate:"required"`
	CreatedAt    string `json:"created_at" validate:"required"`
	Status       string `json:"status" validate:"required"`
	Description  string `json:"description" validate:"required,min=10"`
}
```

### возвращает:
```
type Response struct {
	Status string `json:"status"`
	Error  string `json:"error,omitempty"`
}
```