---
layout: '@/layouts/PostLayout.astro'
title: 'My experience in building my own programming languages for fun and profit!'
excerpt: 'Just what the title says... Built FloLang for a jam'
publishDate: '2020-10-02'
tags: ['flolang', 'programming language', 'replit']
---

https://pavi2410.me/blog/replisp-another-new-language
{/* {% post https://pavi2410.me/blog/replisp-another-new-language %} */}

It's going to be two years now since I created my own programming language called 'REPLisp' and posted about it here. It was my first of a kind experience with no prior knowledge in building one. [The Super Tiny Compiler tutorial by Jamie](https://glitch.com/~the-super-tiny-compiler) was where I got started. This is an introduction to writing your own compiler in JavaScript from scratch. It taught me the different phases of compilation - tokenising, lexical analysis, parsing, evaluation; it taught me about AST (Abstract Syntax Tree); it also taught me about code generation which takes an AST and generates a valid JS code.

https://glitch.com/~the-super-tiny-compiler
{/* {% glitch ~the-super-tiny-compiler %} */}

## Repl.it's PL JAM

![https://repl.it/jam](https://blog.replit.com/images/jam.png)

> We believe we need fresh ideas in programming! We're sponsoring a team with the most creative ideas and prototype to build their dream language.
- https://twitter.com/replit/status/1285634417176776710?s=20

During the mid-late of August this year, @replit organised a programming language jam/hackathon, which gave me a brilliant opportunity to fulfil my dream of creating my own programming language from absolute scratch and is not a Lisp dialect 😅.

## ~~FateLang~~ FloLang - Our Jam Submission

![FloLang logo](https://res.cloudinary.com/practicaldev/image/fetch/s--RXc3rFMv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/http://flolang.tech/FloLangLogo.png)

As part of the jam, we ([Matthew](https://repl.it/@matthewproskils), [Lukas](https://repl.it/@PowerCoder), and I) began working on creating a language collaboratively using repl.it & Discord despite the day and night difference in our timezones. They are excellent in what they do and have a great knowledge of programming. This made it easier for me to collaborate and share my ideas with them. They are also very creative - they have created a Discord bot which runs our REPL, developed the FloShell for our lang's website, and most importantly, came up with the name of the lang (the toughest part 😅).

So, coming to the language part, the language we created is called 'FloLang' (formerly, FateLang). It is an interpreted language written in pure JS. The language is inspired by mostly JS, Python and Koltin. We took the concise syntax of Kotlin and the dynamic typing of JS and merged them into our lang. We use [PegJS parser](https://pegjs.org/) to parse the syntax using PEG (Parsing Expression Grammar) syntax (_Yeah! a language to define a language!_). We used to write the parser by hand but that proved to be tedious and error-prone. Further, we plan to switch to using [Ohm](https://ohmlang.github.io/).

FloLang was made with simplicity in mind. We didn’t want it to be overly complicated like other languages. We tried to add unique touches to it, one of which is "whitespace manipulators". It is an extension to strings which allows FloLang programmers to add n number of whitespaces easily. It is useful in managing long spaces, indenting texts and IDK :D

```
set socialDistancing = "hello\s(10)world"
```

This snippet will create a string in which "hello" and "world" are separated by 10 spaces, like so:

```
hello          world
```

You can even try our lang right here:

https://replit.com/@floLang/FloLang
{/* {% replit @floLang/FloLang %} */}

Learn more about FloLang in the [replit's lang jam submission post](https://replit.com/talk/challenge/FloLang/51627)

## Ending notes

To encourage anyone who is curious about making their own programming language, I am leaving links to some of the resources which I gathered during my journey (not exhaustive).

- [AST Explorer](https://astexplorer.net/)
- [Syntax Design](http://cs.lmu.edu/~ray/notes/syntaxdesign/)
- [Crafting Interpreters](http://www.craftinginterpreters.com/)
- [Make Your Own Lisp Interpreter in 10 Incremental Steps](http://kanaka.github.io/lambdaconf)
- [Build Your Own Lisp](http://buildyourownlisp.com)
- [(How to Write a (Lisp) Interpreter (in Python))](http://norvig.com/lispy.html)
- [Let’s Build A Simple Interpreter](https://ruslanspivak.com/lsbasi-part1/)
- [How to implement a programming language in JavaScript](http://lisperator.net/pltut/)
