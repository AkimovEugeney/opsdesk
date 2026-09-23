-- Local development fixture only. The fixture password for all three users is `demo1234`
-- (Argon2id, parameters m=65536, t=3, p=4). Never reuse this fixture outside a local database.
WITH inserted_users AS (
  INSERT INTO "User" ("name", "role", "email", "passwordHash")
  VALUES
    ('Иван Петров', 'CLIENT', 'ivan.petrov@opsdesk.local', '$argon2id$v=19$m=65536,p=4,t=3$Wo6NbTKb1lXQ4g2By+vk5A$Y2ryi+qZVWbPXLO12MGoi0OkaM59torB9EzEvIZjgIA'),
    ('Елена Смирнова', 'CLIENT', 'elena.smirnova@opsdesk.local', '$argon2id$v=19$m=65536,p=4,t=3$vZB7m+/f7n/JtvM75/40ag$Ih6rEcuAi4Eyri6V7dHXJm63gRTO0MI40msLzRYHHZk'),
    ('Мария Операторова', 'OPERATOR', 'maria.operatorova@opsdesk.local', '$argon2id$v=19$m=65536,p=4,t=3$bKr89jUHFSna61+8NKfhwA$Kr/eLm/EHY+IrrdAnEIuCt3I1JV+Ltnl4bxOsWgIh2g')
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
