---
layout: post
title:  "Demystifying Functional Programming: part 1 - ehy?"
date:   2016-05-13 08:44:26 +0100
categories: functional programming
---


## Values and Functions: Or how I learned to stop worrying and love the Functor

OK, so your friend works for a trendy startup and keeps going on about this thing called Functional Programming.

All you really know about it is it involves a beard, having strong opinions about coffee and waving your arms about a lot while saying "monad!".

What's it all about and quite frankly why should you care?

My aim over the next few blog posts is to try and demystify functional programming (FP).

While I'm going to assume you don't know anything about functional programming, I _am_ going to assume you have experience with a language like Java and have had a few years programming under your belt.

I like to use Scala to demonstrate ideas in FP. If you don't know Scala, don't that it put you off, Scala's syntax for FP is nice and clean (**cough** unlike Java **cough**) but at the same time not too alien for most developers (I thought about doing this in Haskell, but decided that I'd spend too much time trying to explain syntax, which is not the goal here).

This first post is going to be largely theoretical and just concentrate on the what and the why. I'm also going to cover a central idea in FP called _referential transparency_.

## What is Functional Programming?

In my experience people worry about this question way too much:

> Functional programming is coding with mathematical values and functions. That's it.

Cool. Wait... what the hell does that mean?

![ehy?](http://gifrific.com/wp-content/uploads/2012/04/gum-chew-on-phone.gif)

### Mutable state bad

Consider this equation:

```
x = x + 1
```

Now, you've probably written a bit of code like that 100 times in the last year alone, but have you ever thought about it from a mathematical point of view? Well, let's do that

```
    x = x + 1

x - x = 1

    0 = 1
```

erm.... hopefully you agree that can't be a good thing.

If you had been working on a problem and found yourself on this line you would probably conclude that you had messed up (or disproved something).

The reason is simple, mathematical values represent fixed quantities. A quantity may vary over time say, but in that case we say the quantity has a new value. Putting it in code speak:

> Values don't mutate

Yet weirdly we do this all the time in programming - a lot of the time we mutate variables without even thinking about it. We do this despite the fact we know it's nonsense.

I'll let you into a secret: when I first learnt to code, `x = x + 1` type code _REALLY_ bothered me. It didn't fit in with anything I knew about maths and it felt fundamentally wrong. After some time I just dealt with the fact `=` was some weird combination of assignment and equality and sucked up my distress - I bet you probably went through a similar process.

"Ah, but Hamish" you say "you've missed the point, deep down when I mutate a variable all I'm doing is assigning it a new value". That's fine... but it's still mathematical nonsense - values are fixed... what you are doing doesn't have a mathematical grounding. If you look at most of the code you've written involving mutation, I bet a lot of the time what you're _actually_ doing is working something out and then using that value in a _new calculation_.

What does this have to do with programming, after all these are two totally different disciplines?

Well, computers are all about _computing_ values and our programming languages is just the syntax we use to do those calculations.

I'm not going to justify this statement deeply, if you think about it it's clearly true. Everything you program is fundamentally about computing some value, be it describing the layout of a website or [using data from lasers to work out how to adapt the optics on your telescope](https://en.wikipedia.org/wiki/Laser_guide_star).

If we are going to do this, why shouldn't we use well grounded mathematics to do it? At it's heart this is what functional programming is about.

Still not convinced? Got programs with mutable state all up the wazzoo and not got problems? Well let's keep going.

### Functions

Here is the definition of a mathematical function, right from [wikipedia](https://en.wikipedia.org/wiki/Function_(mathematics)):

> In mathematics, a function is a relation between a set of inputs and a set of permissible outputs with the property that each input is related to exactly one output.

Let's break this down a bit. A function requires:

1. a set of inputs

2. a set of outputs

3. each input is related to _exactly one output_

There are some other rules about functions, but first let's have a think about points 1 and 2. A mathematical function requires an input and an output. OK, that's kind of obvious isn't it? What about this bit of code?

```scala
scala> def foo(): Boolean = ???
foo: ()Boolean
```

_Side note for those who don't know Scala: `???` is a useful tool which lets you define the signature of a function/value but not implement the code for it yet. If you were to attempt to run this code, you would get an exception. `def` is how you define a method. Finally, types are specified after a method's name arguments for reasons to do with type inference._

We don't have an input on this method.

What about this?

```scala
scala> def bar(x: Int): Unit = ???
bar: (x: Int)Unit
```

_Note: `Unit` is the same as `void` in Java._

We don't have an output.

In fact, from our definition taken from wikipedia, neither of these are functions.

Let's think about this a bit more, what could `foo` be doing here? Well the only way for it to fulfill it's signature and return a `Boolean` is to either return the same Boolean every time or to go and fetch that value from somewhere else. In which case it's probably mutable, which we've already decided is bad.

A similar argument holds for `bar`, it is probably setting a variable somewhere.

So we have discovered something quite interesting here, if you have a method which either takes `Unit` or returns `Unit`, then it's not a true function and is probably mutating something.

Let's now look at point 3:

> each input is related to _exactly one output_

This is really important. Let's define a function and see what it gives us:

```scala
scala> def baz(x: Int, y: Int): Int = (x + y) - (2 * y)
baz: (x: Int, y: Int)Int

scala> val result = 8 * baz(3, 4)
result: Int = -8
```

For some `x` and `y` we know that `baz` will give us a unique output. If we call `baz` again with the same `x` and `y` then we get the same output. Given that simple fact, it means that we can replace every call to `baz` in our program with `baz`'s calculation:

```scala
scala> val result = 8 * ((3 + 4) - (2 * 4))
result: Int = -8
```

ie

```scala
scala> val result = -8
result: Int = -8
```

The ability to do this is one of the fundamental principles of functional programming and is called [_referential transparency_](https://wiki.haskell.org/Referential_transparency).

Fair enough. What if `baz` wasn't pure?

```scala
scala> var m: Int = 0
m: Int = 0

scala> def baz(x: Int, y: Int): Int = {
     |   m = x
     |   (x + y) - (2 * y) + m
     | }
baz: (x: Int, y: Int)Int

scala> val result1 = 8 * baz(3, 4)
result1: Int = 16

scala> val result2 = 8 * baz(3, 4)
result2: Int = 16
```

In this case, we have a problem. Substituting `baz` into where it's called doesn't tell the whole story - there's more going on which we just can't substitue (our mutator `m`).

Something worse also happens, we get a different output every time we call `baz` even if we use the same inputs. That means it's not a mathematical function and in pratical terms it make the whole program harder to reason about. How many times have you had to debug some function and step through the first 10 calls only to find it do something different on the 11th call? If you had used a mathematical function, then you wouldn't have had to do this. You would know that _every single time you called a function with the same inputs, you would get the same output_.

In functional programming, we often call methods like this _impure_ or _side effecting_. Other, maybe less obvious examples are:

- throwing exceptions (see below)
- printing to the console
- reading/writing to disk (basically IO in general)

You might be thinking "woah there, IO? If I can't read in data or write out the results of my program, then that's not a very interesting program is it?". Which is fair, the original strict FP languages were very impractical and didn't do much more than "heat up your computer's processor". I want to cover this in another blog post so won't talk about this again here, but rest assured there are mathematically consistent ways to deal with this (spoiler: yay, monads!).




Because of referential transparency, you should be able to inline every part of your code and end up with the same program (er.... conceptually... don't actually do it probably won't be very nice to read)

Exceptions are a weird one. I've included it here even though they are used in purely functional languages, but bear with me, I have a point. Exceptions in FP mean "something went very wrong and I can't recover". That's it. In my opinion this is also they should also be used in impertive programs. However, that's not always the case and it's very common to see exceptions used as almost a second return value.

For example, how often have you seen code like this?

```scala
scala> case class Client(id: Int, balance: Int)
defined class Client

scala> val premiumAccountIds = List(1, 2, 3, 4)
premiumAccountIds: List[Int] = List(1, 2, 3, 4)

scala> def hasCredit(c: Client): Boolean = ???
hasCredit: (c: Client)Boolean

scala> def canWithdrawFunds(c: Client): Boolean = {
     |   if (premiumAccountIds contains c.id)
     |     hasCredit(c)
     |   else
     |     throw new IllegalArgumentException("Client " + c.id + " is not a premium account holder")
     | }
canWithdrawFunds: (c: Client)Boolean
```

Here an exception is basically used to deal with business logic. Often you see this anti-pattern in REST apis, an ID isn't found, an exception is thrown and then passed all the way up to the controller to return as a 404 (or something similer).

This code isn't referentially transparent and under our definition above, means it's not a mathematical function (this function effectively has 2 codomains, 'Boolean' and some Exception codomain).

### Passing more than simple values

The last thing I'm going to touch on today is passing functions. Remember our definition of a mathematical function? All we required was that the function took a set of input and returned a set of outputs. We didn't restrict those inputs/outputs, meaning we can pass _other_ functions about.

```scala
scala> def f[A,B](g: A => B): A => B = ???
f: [A, B](g: A => B)A => B
```

This function takes some function `g` from `A` to `B` and returns you another function from `A` to `B`.

```scala
scala> import scala.language.higherKinds // ignore this line for now
import scala.language.higherKinds

scala> def m[F[_],A,B](fa: F[A], f: A => B): F[B] = ???
m: [F[_], A, B](fa: F[A], f: A => B)F[B]
```

This function takes some collection `fa` (that's what the whole `F[A]` is doing here) and a function from `A` to `B`, then changes every `A` in `F[A]` to a `B`. That sounds pretty useful, well it is - this function is normally called `map` and is the basis of an idea called a _Functor_ which I'll talk about next time.

Expanding on this, functions can also return functions

```scala
scala> def g[A,B,C](j: A => B): A => C = ???
g: [A, B, C](j: A => B)A => C
```

These features are very useful when creating new programs.

### Conclusions

In mathematics, we start from a small, self consistent set of tools and use those tools to build up more tools. This is exactly the approach used in functional programming, we use values and functions to compose programs.

The definitions of the values and functions are chosen to fit in with maths. This is very deliberate, if we use mathematical functions, then we can use the last 100 years of mathematical discoveries to learn new things about our programs. If we aren't stict in the tools we use, then we can't do this.

This has been quite a wordy post, with a bit of maths and very little code. Hopefully it has made you think a bit about the code you use and it's grounding.

Next time, tools of the trade...
