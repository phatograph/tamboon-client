## Setup

1. Clone the source.

    ```bash
    $ git clone git@github.com:phatograph/tamboon-client.git
    ```

2. Install dependencies.

    ```bash
    $ npm install
    ```

3. Setup environment variables.

    ```bash
    $ export OMISE_PKEY="pkey_test_54tfzd..." OMISE_SKEY="skey_test_54tfzdzsu8..."
    ```

4. Kickoff development mode.

    ```bash
    $ npm run dev
    ```

5. Navigate to [http://localhost:4000/](http://localhost:4000/).

6. Start the patched Tamboon application in a separated terminal.
  **Using port 4001**.

    ```bash
    $ cd path-to-patched-tamboon
    $ bundle
    $ export OMISE_PKEY="pkey_test_54tfzd..." OMISE_SKEY="skey_test_54tfzdzsu8..."  # remember to set the Omise credentials
    $ rails s -p 4001
    ```

7. Enjoy!

---

Stack being used.

- React
- Webpack
- PostCSS
- CSS Modules
