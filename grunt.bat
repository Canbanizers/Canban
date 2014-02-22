@Echo off
IF exist client/node_modules (
    cd client
    echo ==================
    echo = Starting grunt =
    echo ==================
    grunt
) else (
    cd client
    echo =====================================
    echo = Installing Node modules for Grunt =
    echo =====================================
    echo.

    npm install

    echo.
    echo.
    echo.
    echo.
    echo =====================================
    echo =========== Starting Grunt ==========
    echo =====================================
    echo.

    grunt
)

exit