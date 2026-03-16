-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  DEFAULT 'member',
  created_at    TIMESTAMP    DEFAULT NOW(),
  last_login    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    service VARCHAR(50),
    level VARCHAR(10),
    event VARCHAR(100),
    user_id INTEGER,
    ip_address VARCHAR(45),
    method VARCHAR(10),
    path TEXT,
    status_code INTEGER,
    message TEXT,
    meta JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOGS TABLE (เก็บประวัติการ Login)
CREATE TABLE IF NOT EXISTS logs (
  id          SERIAL       PRIMARY KEY,
  service     VARCHAR(50)  NOT NULL DEFAULT 'auth-service',
  level       VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
  event       VARCHAR(100) NOT NULL,
  user_id     INTEGER,
  ip_address  VARCHAR(45),
  message     TEXT,
  created_at  TIMESTAMP    DEFAULT NOW()
);

-- SEED DATA
INSERT INTO users (username, email, password_hash, role) VALUES
  ('alice', 'alice@lab.local', '$2b$10$teD3O9bMu5sn3Cepq461AOnVwsLCUDXAF2bxY4LPUzX2o.BrvxUiy', 'member'),
  ('bob',   'bob@lab.local',   '$2b$10$i0lGeLI5U1Tebm/BKTn2g.4lzidsLFTW1TgWUKWY7qm4FsAW.BVCq',   'member'),
  ('admin', 'admin@lab.local', '$2b$10$okyFJxZ0iXJiyrS4zDKPzuWsql.anN7nADdWaPIvawc0adhKHQUDK','admin')
ON CONFLICT (username) DO NOTHING;