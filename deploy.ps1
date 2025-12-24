# deploy.ps1

# Initialize git if not present
if (-not (Test-Path .git)) {
    git init
}

# Add all files
git add .

# Create commit
git commit -m "Deploy updated DNlite Report Generator for NewCL with logo and layout changes"

# Rename branch to main
git branch -M main

# Add remote origin
# Remove existing remote if it exists to avoid errors
git remote remove origin 2>$null
git remote add origin https://github.com/chishenh/DNlite-Report-Generator-for-NewCL.git

# Push to GitHub
git push -u origin main
