@Echo off
IF exist node_modules (
    echo ==================
    echo = Starting grunt =
    echo ==================
    grunt
) else (
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