\echo 'Delete and recreate crypto db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE crypto_db;
CREATE DATABASE crypto_db;
\connect crypto_db

\i cryptic-schema.sql

\echo 'Delete and recreate crypto_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE crypto_test_db;
CREATE DATABASE crypto_test_db;
\connect crypto_test_db

\i cryptic-schema.sql