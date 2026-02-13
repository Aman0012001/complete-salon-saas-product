<?php
require_once __DIR__ . '/config.php';

class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        $maxRetries = 3;
        $retryDelay = 1000000; // 1 second in microseconds
        $lastException = null;

        for ($i = 0; $i < $maxRetries; $i++) {
            try {
                $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
                $this->connection = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_TIMEOUT => 5, // 5 second connection timeout
                ]);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                $this->connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
                return; // Success!
            }
            catch (PDOException $e) {
                $lastException = $e;
                error_log("Database connection attempt " . ($i + 1) . " failed: " . $e->getMessage());
                if ($i < $maxRetries - 1) {
                    usleep($retryDelay);
                }
            }
        }

        die(json_encode([
            'status' => 'error',
            'error' => 'DATABASE_CONNECTION_ERROR',
            'message' => 'Unable to establish a stable connection with the remote database after multiple attempts. Please ensure your Railway database is active.',
            'details' => $lastException ? $lastException->getMessage() : 'Unknown error'
        ]));
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    // Prevent cloning
    private function __clone()
    {
    }

    // Prevent unserializing
    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }
}
