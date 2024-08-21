
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a web based database to keep up with the ever growing nature of Rose Apothecary. David has been driving Patrick insane so he has enlisted me to help create this database for them.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Django][djangoproject.com/]][Django-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started on this project you first create a setup.

### Prequisites

You must be running this on Python 3.12+.

### Setup

* First clone the directory:
  ```sh
 $ git clone https://github.com/gocardless/sample-django-app.git
 $ cd schitt-creek-apoth
  ```
* Create a virtual environment in python and activate it
```sh
$ python -m venv venv
$ source venv/bin/activate 
```
NOTE: If you're using an editor like VScode or PyCharm you will have to use the Command Palette or Settings respectively to invoke the interpreter.

### Installation

To install dependencies:
```sh
(venv)$ pip install -r requirements.txt
```
### Running File

Once you are finished with your installation,
```sh
(env)$ cd roseapothecary
(env)$ python manage.py makemigrations
(env)$ python manage.py migrate
```
Before running the server, you have to have fake data. Run these two commands
```sh
(env)$ python manage.py seed_products
(env)$ python manage.py seed_data_customers
```

Finally we can run our server using the following:
```sh
(env) $ python manage.py runserver
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You can look more at the Django API here:

[Django API](http://localhost:8000/api/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
