#saving_loan_setting

url  = http://localhost:3000/api/savingsloans
method = get

request  = -
response = [
                {
                    "year": 2025,
                    "shuSaving": 10000,
                    "basicSaving": 50000,
                    "mandatorySaving": 150000,
                    "memberLoanIR": 1.5,
                    "managementLoanIR": 2,
                    "isActive": "NO",
                    "userId": 1
                }
            ]

url  = http://localhost:3000/api/savingsloans/:year
method = get

request  = -
response = {
                "year": 2025,
                "shuSaving": 10000,
                "basicSaving": 50000,
                "mandatorySaving": 150000,
                "memberLoanIR": 1.5,
                "managementLoanIR": 2,
                "isActive": "NO",
                "userId": 1
            }

url  = http://localhost:3000/api/savingsloans
method = post

request  = {
                "year": 2026,
                "shuSaving": 10000,
                "basicSaving": 50000,
                "mandatorySaving": 150000,
                "memberLoanIR": 1.5,
                "managementLoanIR": 2,
                "isActive": "NO"
            }
response =  {
                "message": true
            }


url  = http://localhost:3000/api/savingsloans/:year
method = put

request  = {
                "shuSaving": 10000,
                "basicSaving": 50000,
                "mandatorySaving": 150000,
                "memberLoanIR": 1.5,
                "managementLoanIR": 2,
                "isActive": "YES"
            }
response =  {
                "message": true
            }

url  = http://localhost:3000/api/savingsloans/:year
method = delete

request  =  -
response =  {
                "message": true
            }

#due_date_setting

url  = http://localhost:3000/api/due_date
method = get

request  = [
            {
                "id": 2,
                "year": 2025,
                "userId": 1,
                "lateFee": 2000,
                "isActive": "NO",
                "detail": [
                {
                    "id": 1,
                    "month": 1,
                    "date": 30
                },
                {
                    "id": 2,
                    "month": 2,
                    "date": 28
                },
                {
                    "id": 3,
                    "month": 3,
                    "date": 28
                },
                {
                    "id": 4,
                    "month": 4,
                    "date": 28
                },
                {
                    "id": 5,
                    "month": 5,
                    "date": 28
                },
                {
                    "id": 6,
                    "month": 6,
                    "date": 28
                },
                {
                    "id": 7,
                    "month": 7,
                    "date": 28
                },
                {
                    "id": 8,
                    "month": 8,
                    "date": 28
                },
                {
                    "id": 9,
                    "month": 9,
                    "date": 28
                },
                {
                    "id": 10,
                    "month": 10,
                    "date": 28
                },
                {
                    "id": 11,
                    "month": 11,
                    "date": 28
                },
                {
                    "id": 12,
                    "month": 12,
                    "date": 28
                }
                ]
            },
            {
                "id": 3,
                "year": 2026,
                "userId": 1,
                "lateFee": 2000,
                "isActive": "NO",
                "detail": [
                {
                    "id": 13,
                    "month": 1,
                    "date": 30
                },
                {
                    "id": 14,
                    "month": 2,
                    "date": 28
                },
                {
                    "id": 15,
                    "month": 3,
                    "date": 28
                },
                {
                    "id": 16,
                    "month": 4,
                    "date": 28
                },
                {
                    "id": 17,
                    "month": 5,
                    "date": 28
                },
                {
                    "id": 18,
                    "month": 6,
                    "date": 28
                },
                {
                    "id": 19,
                    "month": 7,
                    "date": 28
                },
                {
                    "id": 20,
                    "month": 8,
                    "date": 28
                },
                {
                    "id": 21,
                    "month": 9,
                    "date": 28
                },
                {
                    "id": 22,
                    "month": 10,
                    "date": 28
                },
                {
                    "id": 23,
                    "month": 11,
                    "date": 28
                },
                {
                    "id": 24,
                    "month": 12,
                    "date": 30
                }
                ]
            }
            ]
response = [
                {
                    "year": 2025,
                    "shuSaving": 10000,
                    "basicSaving": 50000,
                    "mandatorySaving": 150000,
                    "memberLoanIR": 1.5,
                    "managementLoanIR": 2,
                    "isActive": "NO",
                    "userId": 1
                }
            ]

#loan_request

url  = http://localhost:3000/api/loan_request
method = get

request  = -
response = [
                {
                    "id": 11,
                    "nip": "2013250304020063",
                    "createdAt": "2025-06-29T20:50:46.000Z",
                    "loanTerm": 12,
                    "loanAmount": 10000000,
                    "status": "accepted",
                    "description": "Loan for business expansion",
                    "userId": 1
                },
                {
                    "id": 12,
                    "nip": "2013070204020030",
                    "createdAt": "2025-06-29T20:50:46.000Z",
                    "loanTerm": 6,
                    "loanAmount": 5000000,
                    "status": "rejected",
                    "description": "Emergency medical fund",
                    "userId": 1
                }
            ]

url    = http://localhost:3000/api/loan_request
method = post

request  =  {
                "nip": "2013250304020063",
                "loanTerm": 12,
                "loanAmount": 10000000,
                "description": "Loan for business expansion"
            }
response =  {
                "message": true,
                "data": {
                    "id": 16,
                    "nip": "2013250304020063",
                    "createdAt": "2025-06-29T14:08:13.264Z",
                    "loanTerm": 12,
                    "loanAmount": 10000000,
                    "status": null,
                    "description": "Loan for business expansion",
                    "userId": 1
                }
            }

url    = http://localhost:3000/api/loan_request/:id
method = update

request  =  {
                "status": "accepted"
            }
response =  {
                "message": true,
                "data": {
                    "id": 16,
                    "nip": "2013250304020063",
                    "createdAt": "2025-06-29T14:08:13.264Z",
                    "loanTerm": 12,
                    "loanAmount": 10000000,
                    "status": "accepted",
                    "description": "Loan for business expansion",
                    "userId": 1
                }
            }        

url    = http://localhost:3000/api/loan_request/:id
method = delete

request  =  -
response =  {
                "message": true,
                "data": {
                    "id": 16,
                    "nip": "2013250304020063",
                    "createdAt": "2025-06-29T14:08:13.264Z",
                    "loanTerm": 12,
                    "loanAmount": 10000000,
                    "status": "accepted",
                    "description": "Loan for business expansion",
                    "userId": 1
                }
            }  

