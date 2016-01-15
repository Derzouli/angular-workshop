@echo off
curl -X GET http://localhost:3000/tasks/
pause
rem curl -X GET http://localhost:3000/tasks/1
rem pause
curl -H "Content-Type: application/json" -X POST http://localhost:3000/tasks/ -d "{\"id\":\"1\",\"status\":\"open\",\"name\":\"test1\",\"created_at\":\"2016-01-15T08:05:21.731Z\"}"
pause
