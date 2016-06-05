---
layout: post
title:  "You don't need null"
date:   2016-06-05 08:44:26 +0100
categories: scala functional programming
---

Recently I overheard a discussion about nulls in programming. Eventually, one developer asked

> "if I was developing the first programming language, would I naturally discover nulls?"

I hope not, because they are kind of dumb.

Setting a variable to `null` means a very specific thing, namely "this object isn't assigned". `null` isn't some tool to say "I don't know" or "I'll figure it out later". If you are in the situation where you need a `null` then something very bad indeed has happened.

### I don't know!?

You see this pattern quite a lot in Java code

```scala
scala> case class Dragon(name: String, friendsName: String)
defined class Dragon

scala> def hereBeDragons(d: Dragon): String = {
     |     if (d.name == "Elliott") d.friendsName
     |     else null
     | }
hereBeDragons: (d: Dragon)String
```

Here, if some condition is met then a sensible value is returned, otherwise you get `null`...

When you do this, what you are doing is creating a function which is only defined for some of the possible inputs. There are a couple of problems here:

1. you're passing responsibility to the caller to decide what to do for some inputs (which is OK), but _not telling them they need to make that decision_ (which isn't OK)
2. a (pure) function should be defined for all inputs and we like that stuff here

Number 1. here is a big problem. If you wanted to use `hereBeDragons`, how likely are you to know that this could return `null`? What would you do to check? Would you read the code? Probably not. Would you read the associated docs? What docs?

Failing that, you might get lucky and catch this in a unit test, QA or a property based test... but in all probability you won't know about it until things blew up in production.

So what do we do about this? The obvious answer is we should be using an `Option`

```scala
scala> def hereBeDragons(d: Dragon): Option[String] = {
     |     if (d.name == "Elliott") Some(d.friendsName)
     |     else None
     | }
hereBeDragons: (d: Dragon)Option[String]
```

Here, we're returning an `Option[String]` rather than the original `String`. Lifting the output like this makes the function pure (there is now an output in the domain for all inputs) and also tells the caller that they need to make some decision about the output.

### I'll figure it out later

Another common place you see `null` is when you need a variable set in some restricted scope. Normally you see this around loops and try/catch blocks.

In this example, we would like to form a `String` to tell us if there is a prime in some given range. Using a really bad bit of code, we can loop through the values in that range and set some variable (`x`) to a success message if we find one or a failure message if we don't

```scala
scala> var x: String = null
x: String = null

scala> val min: Int = 123
min: Int = 123

scala> val max: Int = 666
max: Int = 666

scala> def isPrime(n: Int) = (2 until n - 1) forall (n % _ != 0)
isPrime: (n: Int)Boolean

scala> for (y <- min to max) {
     |     if (isPrime(y)) x = "Found one!"
     |     if (y == max && x != "Found one!") x = "Nope :("
     | }

scala> println(x)
Found one!
```

If you think about what we're actually doing here, `x` is the result of some calculation. We should be able to move that calculation out to it's own function and assign `x` the result

```scala
scala> val min: Int = 123
min: Int = 123

scala> val max: Int = 666
max: Int = 666

scala> def isPrime(n: Int) = (2 until n - 1) forall (n % _ != 0)
isPrime: (n: Int)Boolean

scala> def canWeFindAPrime(bottom: Int, top: Int): String = {
     |     if (isPrime(bottom))
     |         "Found one!"
     |     else if (bottom < top)
     |         canWeFindAPrime(bottom + 1, top)
     |     else
     |         "Nope :("
     | }
canWeFindAPrime: (bottom: Int, top: Int)String

scala> val x = canWeFindAPrime(min, max)
x: String = Found one!

scala> println(x)
Found one!
```

Here, we get the same result but haven't needed a `null` to get around scope issues.

### So no, you don't need nulls

OK, so I've not _proved_ you can code without `null` here, but I have shown you ways around two of the most common uses of `null` in every day programming. In both cases `null` arose from the fact the code was somehow on the wrong level - a piece of logic should have been in a function or the result of a function should have been higher. I don't know of any genuine area of programming where `null` is required.

As further proof, Haskell has no `null` value (it has `undefined`, but that is different) - Haskell simply doesn't need it.
