# Start from a PHP 8.1 Apache base image
FROM php:8.1-apache-bullseye

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache modules
RUN a2enmod rewrite headers

# Configure AllowOverride All for .htaccess
# We append to apache2.conf to override previous settings for /var/www/html
# 0. Install Composer & System Dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 1. Copy application source code
COPY . /var/www/html/

# 2. Install dependencies
WORKDIR /var/www/html
RUN composer install --no-interaction --optimize-autoloader --no-dev

# 3. Copy and set up the robust entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
# Fix potential Windows CRLF issues and make executable
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# 3. Use the custom entrypoint script to start Apache (handles PORT and cleanup)
ENTRYPOINT ["docker-entrypoint.sh"]

# Note: EXPOSE is informational only, the entrypoint handles the actual PORT
EXPOSE 8080
