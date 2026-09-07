WITH inserted_users AS (
  INSERT INTO "User" ("name", "role")
  VALUES
    ('Иван Петров', 'CLIENT'),
    ('Елена Смирнова', 'CLIENT'),
    ('Мария Операторова', 'OPERATOR')
  RETURNING "id", "name"
), users AS (
  SELECT "id", "name" FROM inserted_users
  UNION ALL
  SELECT "id", "name"
  FROM "User"
  WHERE "name" IN ('Иван Петров', 'Елена Смирнова', 'Мария Операторова')
)
INSERT INTO "Appeal" (
  "status",
  "title",
  "description",
  "clientId",
  "ownerId",
  "createdAt",
  "updatedAt",
  "closedAt"
)
VALUES
  (
    'NEW',
    'Не пришло подтверждение заказа',
    'Клиент не получил письмо после оформления заказа.',
    (SELECT "id" FROM users WHERE "name" = 'Иван Петров'),
    NULL,
    NOW() - INTERVAL '1 hour',
    NOW() - INTERVAL '1 hour',
    NULL
  ),
  (
    'NEW',
    'Вопрос по возврату',
    'Клиент уточняет срок возврата денежных средств.',
    (SELECT "id" FROM users WHERE "name" = 'Елена Смирнова'),
    NULL,
    NOW() - INTERVAL '3 hours',
    NOW() - INTERVAL '3 hours',
    NULL
  ),
  (
    'IN_PROGRESS',
    'Ошибка в адресе доставки',
    'Оператор уточняет корректный адрес с клиентом.',
    (SELECT "id" FROM users WHERE "name" = 'Иван Петров'),
    (SELECT "id" FROM users WHERE "name" = 'Мария Операторова'),
    NOW() - INTERVAL '30 minutes',
    NOW() - INTERVAL '10 minutes',
    NULL
  ),
  (
    'CLOSED',
    'Вопрос по составу заказа',
    'Клиент получил ответ, обращение закрыто.',
    (SELECT "id" FROM users WHERE "name" = 'Елена Смирнова'),
    (SELECT "id" FROM users WHERE "name" = 'Мария Операторова'),
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  );
