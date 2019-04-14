# Techstack

- Node.js
- DB: Postgres
- ORM: Sequelize

# Setup

1. Clone this repo
2. Copy `.env.example` file into `.env` file and add credentials.
3. run `npm i`
4. run `npm start`
5. Server is running at: [http://localhost:6005](http://localhost:6005)

# End Points

* `/wallet`
    * `GET /`
        * Get all wallets.
        * **Requires**: No parameters
        * **Accepts**: No parameters
    * `GET /:id`
        * Get a single wallet.
        * **Requires**: No parameters
        * **Accepts**: No parameters
    * `POST /`
        * Creates a wallet for user.
        * **Requires**: `user_id, has_deposited, wallet_balance, wallet_balance`
        * **Accepts**: `user_id, has_deposited, wallet_balance, wallet_balance`
    * `PUT /:id`
        * Updates a wallet.
        * **Requires**: No parameters
        * **Accepts**: `user_id, has_deposited, wallet_balance, wallet_balance`
    * `DELETE /:id`
        * Deletes a wallet.
        * **Accepts**: No parameters
    * `POST /query`
        * Query with different conditions
        * **Requires**: `user_id, conditions: { p1: '', p2: '', op: '' }`
        * **Accepts**: `user_id, conditions: { p1: '', p2: '', op: '' }`
        * **Example**
        ```javascript
        {
            "user_id": 1,
            "conditions": {
                "p1": {
                    "p1": "has_deposited",
                    "p2": "true",
                    "op": "="
                },
                "p2": {
                    "p1": "wallet_balance",
                    "p2": "30",
                    "op": "<"
                },
                "op": "AND"
            }
        }
        ```
* `/transform`
    * `GET ?lang/`
        * Get data.
        * **Requires**: No parameters
        * **Accepts**: `lang [in query parameter]`
