import uvicorn

if __name__ == "__main__":
    uvicorn.run("backend.main:app", reload=True)
    # open http://localhost:8000/index.html in your browser
    # or use live server extension in vscode to open index.html