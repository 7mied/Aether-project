#!/bin/bash

echo "=== Foreplan Project Verification ==="
echo ""

# Function to check file and optionally grep for content
check_file() {
    file_path="$1"
    search_string="$2"
    description="$3"

    if [ -f "$file_path" ]; then
        if [ -n "$search_string" ]; then
            if grep -q "$search_string" "$file_path"; then
                echo "✅ $description: Found & Verified"
            else
                echo "⚠️ $description: File exists, but content might be missing '$search_string'"
            fi
        else
            echo "✅ $description: Found"
        fi
    else
        echo "❌ $description: MISSING at $file_path"
    fi
}

echo "--- Backend Checks ---"
check_file "server/models/Project.js" "ProjectSchema" "Project Model"
check_file "server/middleware/auth.js" "jwt.verify" "Auth Middleware"
check_file "server/routes/projects.js" "router.post" "Project Routes"
check_file "server/index.js" "/api/projects" "Server Entry Point (Project Route Registration)"

echo ""
echo "--- Frontend Checks ---"
check_file "client/src/pages/DashboardPage.jsx" "DashboardPage" "Dashboard Page Component"
check_file "client/src/App.jsx" "DashboardPage" "App.jsx (Dashboard Route)"

echo ""
echo "=== Verification Complete ==="
