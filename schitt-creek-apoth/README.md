
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Rose Apothecary</h3>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a web based database to keep up with the ever growing nature of Rose Apothecary. David has been driving Patrick insane so he has enlisted me to help create this database for them.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[Django](djangoproject.com/)

[Bootstrap5](Bootstrap.com)

[JQuery](JQuery.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started on this project you first create your setup.

### Prequisites

You must be running this on Python 3.10+.

### Setup

 1. First clone the directory:

  ```
      $ git clone https://github.com/deneille/gom-jabbar.git

      $ cd schitt-creek-apoth
 ```

2. Create a virtual environment in python and activate it

```$ python -m venv venv
$ source venv/bin/activate 
```
**NOTE: If you're using an editor like VScode or PyCharm you will have to use the Command Palette or Settings respectively to invoke the interpreter before moving on to the next step.**


### Installation

To install dependencies:

```
(venv)$ pip install -r requirements.txt
```
### Running File

Once you are finished with your installation,
```
(venv)$ cd roseapothecary
(venv)$ python manage.py makemigrations
(venv)$ python manage.py migrate
```
Before running the server, you have to have fake data. Run these two commands
```
(venv)$ python manage.py seed_products --file ./api/data/products.csv 

(venv)$ python manage.py seed_data_customers
```

Finally we can run our server using the following:
```
(venv) $ python manage.py runserver
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can look more at the Django API here:

[Django API](http://localhost:8000/api/)

**NOTE: You replace all commands `python` commands with `python3` and all the `pip` commands with `pip3` if you have both Python 2 and Python 3 installed.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>
