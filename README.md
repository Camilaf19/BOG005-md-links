# Markdown Links

## Index

* [1. Proyect summary](#1-Proyect-summary)
* [2. Library technical documentation](#2-Library-technical-documentation)
* [3. Use and Installation guide](#3-Use-and-Installation-guide)


## 1. Proyect summary

This library is created using Node.js, which allows reading and analyzing files in `Markdown` format, where the links found are extracted for validation and report some basic statistics.

The program is executable through a CLI, and its programming is based on promises and recursion.


## 2. Library technical documentation
### 2.1 JavaScript API

 `mdLinks(path, options)`

##### Arguments

* `path`: **Absolute** or **relative** path to the **file** or **directory**.
If the path passed is relative, it should resolve to relative to the directory
where node is invoked from - _current working directory_).
* `options`: An object with **only** the following properties:
  - `validar`: Boolean that determines if you want to validate the links
    found.
  - `stats`: Boolean that determines if you want to get an output
    with general statistical information.

##### Return value

The function must **return a promise** (`Promise`) that **resolves to an array**
(`Array`) of objects (`Object`), where each object represents a link and contains
the properties.

### 2.2 CLI (Command Line Interface)

To run md-links in the terminal, it must be entered as follows: `md-links <path-to-file> [options]`

The Md-links program receives a relative or absolute path as the first parameter and allows the following options as input.

- Validate
- Stats

When entering only the path, the result will be the path, the link and the link text. 

For example:
With `validate: false`:

* `href`: URL found.
* `text`: Text that appears inside the link (`<a>`).
* `file`: Path of the file where the link was found.

##### Options

##### `--validate`

If you enter the --validate option, the module must make an HTTP request to find out if the link works or not. If the link results in a redirect to a URL that responds ok or fail. ( Validate:true )

With `validate:true` :

* `href`: URL found.
* `text`: Text that appears inside the link (`<a>`).
* `file`: Path of the file where the link was found.
* `status`: HTTP response code.
* `ok`: Message `fail` on failure or `ok` on success.

For example:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

If you enter the `--stats` option the output will be a text with basic statistics about the links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
Also if you enter `--stats` and `--validate` you can get statistics that need the validation results.
you need from the validation results.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 3. Use and Installation guide

Write the command line run bellow to install the module:
  ```
  npm i camilaf-md-links
  ```

This module includes an executable as an interface that can be imported with `require`.
 ```
  const {mdLinks} = require('camilaf-md-links')
  ```

To run it from the CLI:
 ```
 md-links <path-to-file> [options]
  ```