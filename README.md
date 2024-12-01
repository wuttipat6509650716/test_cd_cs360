# CS360 1/2567 Term Project: [FoodAdvisor]

## Group Information

  
- **Group Name:** [SaveToFocus]

  

## Members

| Name | Student ID |
|--|--|
|Natthida Sae-tang |6509650070|
|Teerawat Nakornchai |6509650476|
|Napat Thaibankuai |6509650492|
|Punnatut Maneewong |6509650542|
|Wuttipat Pipopsukawadee |6509650716|

## Project Goal

The goal of this project is to study deployment processes and automate 10 tests. the project will focus on enhancing and developing new features. that system can be deployed and accessed externally.

### Features CRUD

- [Feature 1: Register and Authentication]  
- [Feature 2: Profile]  


### Technologies Used  
- **Backend:** Strapi V4  
- **Frontend:** React.js  
- **Hosting/Deployment:** AWS EC2  
- **Database:** SQLite

### Software Require 
- Node 16
- npm >=6.0.0
- yarn 1.22.22
- pm2 v.5.4.2
- git

## Setup AWS EC2 Instance

1.  **Launch `AWS EC2` Instance**:

    -  **Instance Type**: t2.medium

    -  **Operating System**: Amazon Linux

  

2.  **Configure Security Group Rules**:

    -  **Type**: `SSH`, **Protocol**: `TCP`, **Port Range**: `22`, **Source**: `::/0`

    -  **Type**: `HTTP`, **Protocol**: `TCP`, **Port Range**: `80`, **Source**: `0.0.0.0/0, ::/0`

    -  **Type**: `HTTPS`, **Protocol**: `TCP`, **Port Range**: `443`, **Source**: `0.0.0.0/0, ::/0`

    -  **Type**: `Custom TCP Rule`, **Protocol**: `TCP`, **Port Range**: `1337`, **Source**: `0.0.0.0/0`

    -  **Type**: `Custom TCP Rule`, **Protocol**: `TCP`, **Port Range**: `3000`, **Source**: `0.0.0.0/0`


## How to deploy and run the project manually

## Step-by-Step Guide
- Use `sudo yum check-update || sudo yum update -y` For Update (use other, If you use other OS)
- Use `sudo yum install git` If Your System Not have git


### 1. Install NVM (Node Version Management) on the AWS Instance ( Use other If you want )
- Install nvm, then install node 16 by nvm :
```bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash 
		
source ~/.bashrc
		
nvm install 16
		
nvm use 16
		
node -v

```

### 2. Install yarn on the AWS Instance
- Install yarn global by npm :
```bash

npm install -g yarn@1.22.22

```

### 3. Install pm2 on the AWS Instance
- Install pm2 by npm : 
```bash

npm install -g pm2@5.4.2

```

### 4. Setup environment

cd into `cs360_group` folder. `cd cs360_group`

* Strapi **Backend** :

	- use `curl ipinfo.io/ip` for get **PublicIPv4**
	- use `openssl rand -base64  32` For **STRAPI_ADMIN_CLIENT_PREVIEW_SECRET**
	- use `openssl rand -base64 16` For **JWT_SECRET**
```bash
# Create & Edit .env File (Backend)
nano  api/.env
```
```bash
# Copy The following into .env

NODE_ENV=production
HOST=0.0.0.0
PORT=1337
STRAPI_ADMIN_CLIENT_URL=http://<public IPv4 of the EC2 instance>:3000
STRAPI_ADMIN_CLIENT_PREVIEW_SECRET=<your srcret>
JWT_SECRET=<your secret>
# Ctrl+o > Enter > Ctrl+x. For Save File.
```

* NextJs **FontEnd** :
	- use `openssl rand -base64 32` For **PREVIEW_SECRET**
```bash
# Create & Edit .env File (FontEnd)
nano  client/.env
```
```bash
# Copy The following into .env
NEXT_PUBLIC_API_URL=http://<public  IPv4  of  the  EC2  instance>:1337
PREVIEW_SECRET=<your  Secret>
```

### 5. Start Project
- **Backend** 
```bash

#cd into api folder (backend)
cd api
			
# install Libs
yarn & yarn seed

# pm2 runtime
pm2 start yarn --name Backend -- start

```
- **Fontend** 
```bash

#cd into client folder (fontend)
cd ../client
			
# install Libs
yarn & yarn build

# pm2 runtime
pm2 start yarn --name Fontend -- start

```
> Use `pm2 list` for List Process
> Use `pm2 stop <name>`for Stop Process
> Use `pm2 del <name>` for Delete Process
 
### Strapi User Roles and Access
#### Super Admin
- **Email:** `admin@strapidemo.com`
- **Password:** `welcomeToStrapi123`

#### Editor
- **Email:** `editor@strapidemo.com`
- **Password:** `welcomeToStrapi123`

#### Author
- **Email:** `author@strapidemo.com`
- **Password:** `welcomeToStrapi123`

## How to deploy and run the project using the provided bash script [Specify the bash script path in the repo]

  
## Step-by-Step Guide

  

### 1. Install Git on the AWS Instance

- First, update the system packages:

```bash

sudo yum update -y

```

- Then, install Git:

```bash

sudo yum install git -y

```

  

### 2. Clone the Repository from GitHub

- Clone the repository using `git clone`:

```bash

git clone https://github.com/wuttipat6509650716/cs360_group.git

```

- Navigate into the cloned project directory:

```bash

cd cs360_group

```

  

### 3. Check the Permissions of `start.sh`

- Verify if the `start.sh` script has execute permissions:

```bash

ls -l start.sh

```

- If the script does not have execute permissions, grant it using the following command:

```bash

chmod +x start.sh

```

  

### 4. Run the `start.sh` Script

- Execute the script to deploy and run the project:

```bash

./start.sh

```

[ภาพ screen capture ของหนาเว็บแอปพลิเคชันซึ่ง deploy ไวบน EC2]
![Screen capture](https://media.discordapp.net/attachments/996073868768850002/1286932089958174760/image.png?ex=66efb468&is=66ee62e8&hm=69cac61d75e5500624b226f38e6c00a60a03f7e96880f09f24769c927eca3b7e&=&format=webp&quality=lossless&width=1514&height=946)

## Unit and Integration Testing Overview
In this project, we use several essential tools for both Unit and Integration Testing:

- **Jest**: The primary testing framework for Unit Tests, ensuring that individual functions and modules work as expected. Jest provides convenient management for assertions, mocking, and asynchronous operations.
- **Supertest**: A tool used to test HTTP endpoints in Integration Tests, simulating HTTP requests sent to the API and checking responses such as status codes and response content.
- **Strapi Testing Utils**: A utility set for simulating Strapi’s operations during testing, used to set up and tear down the Strapi instance before and after tests, enabling API and middleware testing that mirrors real-environment functionality.


## Setting Up Tests
- Install test tools
    ```bash
        yarn add --dev jest supertest
    ```
- in file `package.json` add **test** command to scripts section

    ```bash
        # add test command to scripts section
        "scripts": {
            "develop": "strapi develop",
            "start": "strapi start",
            "build": "strapi build",
            "strapi": "strapi",
            "test":"jest --runInBand --coverage=true"
        },
    ```
    and add those lines at the bottom of file
    ```bash
        "jest": {
            "collectCoverageFrom": [
                "src/api/**/*.js"
                ],
            "coverageReporters": [
                "clover",
                "json",
                "text"
                ],
            "testPathIgnorePatterns": [
                "/node_modules/",
                ".tmp",
                ".cache"
                ],
            "modulePathIgnorePatterns": [
                "./build"
                ],
            "testEnvironment": "node"
        }
    ```
    
## Running Tests
- use this command

    ```bash
    yarn test #use for test
    ```

## Test File Structure
```bash
cs360_group/
└── api/
    ├── src/
    │   └── api/
    │       └── profile/
    │           └── middlewares/
    │               └── isOwner.js                # Middleware file for checking ownership
    └── tests/
        ├── unit/
        │   └── isOwner.test.js                  # Unit test for the isOwner middleware
        └── integration/
            └── profile/
                └── index.js                     # Integration tests for profile-related features
            └── integration.test.js              # General integration tests

```
In this structure:

- The `isOwner.js` file in src/api/profile/middlewares/ is the middleware being tested.
- The `isOwner.test.js` file in unit/ is for unit testing of the isOwner middleware.
- The `index.js` file in integration/profile/ is for integration testing of functions within the profile.
- The `integration.test.js` file is for general integration testing of the API.
## Test Coverage
The tests in this repository cover the following functionality:

- **Unit test**
    - Test custom **isOwner** middleware to verify user permissions.

- **Integration**

    CRUD operations for user profiles, including:
    - **Create**: Ensure profile creation is successful with valid data.
    - **Read**: Retrieve profile data for authenticated users.
    - **Update**: Test profile updates, ensuring only owners can modify.
    - **Delete**: Confirm only authorized users can delete their profiles.

## Viewing Test Results
To view the test results, you can check the **console output** or review the **coverage report** that provides details on code coverage.

**Console output**

```bash
    yarn run v1.22.22
$ jest --runInBand --coverage=true
jest-haste-map: duplicate manual mock found: index
  The following files share their name; please delete one of them:
    * <rootDir>/.cache/admin/src/hooks/useAdminUsers/__mocks__/index.js
    * <rootDir>/.cache/admin/src/hooks/useAdminRoles/__mocks__/index.js

jest-haste-map: duplicate manual mock found: index
...

 PASS  tests/integration/integration.test.js (12.343 s)
 PASS  tests/unit/isOwner.test.js
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |     100 |      100 |     100 |     100 |                   
...
-----------------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       14 passed, 14 total
Time:        12.742 s, estimated 19 s
Ran all test suites.
Done in 14.30s.

```

**Coverage Report**
- Upon completion, a coverage report will be generated at cs360_group/api/coverage/clover.xml. This report provides a comprehensive overview of the code coverage across various modules and functions, helping identify areas that may need additional tests for better coverage.
## Adding New Tests
- **Unit Test**
    
    - Add file `<name>.test.js` to unit test folder
    - And implement Test inside file
    
- **Integration**

    1. **Create a Directory for Each API**

        Create a new folder named after the API you intend to test. For example, if you're testing the profile API, the folder structure would be:
    2. **Create index.js Inside the API Folder** eg. authen/index.js
        
        In this file implement test for Api
    3. **Modify `integration.test.js`**

        Add `require('./name/index');` in under file
    

## GitHub Action CI pipeline

### Pipeline Overview
This GitHub Actions pipeline, named **Api CI**, is triggered on any push or pull request to All branches, designed to automate the testing process across different operating systems (Ubuntu ,ubuntu, redhat) and Node.js versions.

### Workflow Structure

YAML FILE : `api/github/workflows/Automate-Test.yml`

1. **Trigger Conditions**:
   - The pipeline runs on pushes and pull requests to All branches.

2. **Job Configuration**:
   - The workflow defines a single job called **test** that runs across multiple environments by using a **matrix strategy** to run the test concurrently on:
     - **Operating Systems**: `macos-latest` and `ubuntu-latest`
     - **Node.js Versions**: Node version 16.x and 18.x

3. **Job Steps**:
    - **Checkout Code**: 
        - Uses the `actions/checkout@v4` action to clone the repository code into the workflow environment.
    
    - **Set up Node.js**:
        - Configures the Node.js environment according to the specified version from the matrix (`node` or `16.x`), using the `actions/setup-node@v4` action.
    
    - **Install Yarn**:
        - Installs Yarn globally using `npm install -g yarn`.

    - **Install Dependencies**:
        - Navigates to the `./api` directory and installs the required dependencies by running `yarn`.

    - **Data Seeding (if applicable)**
        - In this step seeds the database with initial data by executing yarn seed within the ./api directory

    - **Set up Environment Variables and Run Tests**:
        - Defines necessary environment variables, `JWT_SECRET` and `ADMIN_JWT_SECRET`, using GitHub secrets to secure sensitive information. 
        - Runs `yarn test` in the `./api` directory to execute the test suite for the backend.
3.  **Viewing Test Results in GitHub**

    1. **Navigate to the Repository:**

        Open your GitHub repository where the CI workflow is configured.

    2. **Go to the Actions Tab:**

        Click on the "Actions" tab near the top of the page. This tab shows all the workflow runs for your repository.

    3. **Select the Workflow Run:**

        Find the most recent run of your CI workflow (e.g., Api CI) from the list. Click on the run to view its details.

### Running the Test Suite Locally
- **Run test in local**

    ```bash
    yarn test
    ```
- **Viewing Test Results in local**

    After running the tests, review the output in the terminal, which will show
    - The number of tests run
    - Tests that passed, failed, or were skipped
    - Detailed error messages and stack traces for any failing tests

