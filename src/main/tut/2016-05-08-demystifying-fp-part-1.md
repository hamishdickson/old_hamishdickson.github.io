---
layout: post
title:  "Demystifying Functional Programming: part 1 - ehy?"
date:   2016-05-08 15:44:26 +0100
categories: functional programming
---


## ehy?

OK, so your friend works for a trendy startup and keeps going on about this thing called Functional Programming.

All you really know about it is it involves a beard, having strong opinions about coffee and waving your arms about a lot while saying "monad!".

What's it all about? Why should you care about it when your code works fine just the way it is?

The aim of my next few blog posts (actually I think 5 at this point...) is to try and demystify functional programming (FP) for you. It's far from scary and if you take on the basic ideas your code will thank you for it.

While I'm going to assume you don't know anything about functional programming, I _am_ going to assume you have experience with a language like Java.

I like to use Scala to demonstrate ideas in FP. If you don't know Scala, don't that it put you off, Scala's syntax for FP is nice and clean (**cough** unlike Java 8 **cough**) but at the same time not too alien for most developers (I thought about doing this in Haskell, but decided that I'd spend too much time trying to explain syntax, which is not the goal here).

This first post is going to concentrate on the what and the why. I'm also going to cover a central idea in FP called _referential transparency_.

## What is Functional Programming?

In my experience people worry about this question way too much, but I've broached the topic so let's talk about it anyway.

> Functional programming is coding with mathematical functions. That's it.

Cool. Wait... what the hell does that mean?

### Mutable state bad

Consider this equation:

```
x = x + 1
```

Now, you've probably written a bit of code like that 100 times in the last year alone, but have you ever thought about it from a mathematical point of view? Well, let's do it now

```
    x = x + 1
        
x - x = 1
        
    0 = 1
```
            
Which hopefully you agree is bad.

If you had been working on a problem and found yourself on this line you would probably conclude that you had messed up (or disproved something). If you mutate variables like this in maths you will always get contridictions.

Yet weirdly we do this all the time in programming - a lot of the time we mutate variables without even thinking about it. We do this dispite the fact we know it's mathematically nonsense.

I'll let you into a secret: when I first learnt to code, code like `x = x + 1` _REALLY_ bothered me. It didn't fit in with anything I knew about maths and it felt fundamentally wrong. After some time I realised mutating variables was useful to the nitty gritty of actually solving problems, sucked it up and just used it. Maybe you went through a similar process?

"Ah, but Hamish" you say "you've missed the point, deep down when I mutate a variable all I'm doing is assigning it a new value". That's fine... but it's mathematical nonsense - you don't reassign values... it's a meaningless statement. If you look at most of the code you've written involving mutation, I bet a lot of the time what you're actually doing is working something out and then using that value in a __new calculation__.
            
So, I've come to the first point I want to make:

> Mathematical values don't mutate.

What does this have to do with programming, after all these are two totally different disciplines?

> Well, computers are all about _computing_ values and our programming languages is just the syntax we use to do those calculations.

I'm not going to justify this statement deeply, if you think about it it's clearly true. Everything you program is fundamentally about computing some value, be it describing the layout of a website or [using data from lasers to work out how to adapt the optics on your telescope](https://en.wikipedia.org/wiki/Laser_guide_star).

If we are going to do this, why shouldn't we use well grounded mathematics to do it? At it's heart that's all functional programming is.

By the way, since I'm going to be using Scala here but assuming you may not know it, I should mention Scala has special syntax for mutable variables. If a variable is defined with a `var`, then it's mutable, while a `val` is not. This, as you can probably guess, is a very deliberate decision.

Still not convinced? Got programs with mutable state all up the wazzoo and not got problems? Well let's keep going.

### Functions

Here is the definition of a mathematical function, right from [wikipedia](https://en.wikipedia.org/wiki/Function_(mathematics)):

> In mathematics, a function is a relation between a set of inputs and a set of permissible outputs with the property that each input is related to exactly one output.





            
Functional programming is also about avoiding side effects. Typical side effects include
- changing variables outside the function's scope
- printing to the console (yup)
- throwing exceptions (see below)
- reading/writing to disk
- well... actually most of what you think of as IO!
            
You might be wondering "if I can't write out the results of my program to the console, then that's not a very interesting program is it?". Which is fair, the original strict FP languages were very impractical and didn't do much more than heat up your computer's processor. I want to cover this in another blog post so won't talk about this again here, but rest assured that this problem is now solved (spoiler: yay, monads!)
            
The reason you want to do this is something called referential transparency. If you use (call) a mathematical function, you should be able to replace that call with the function itself and get the same result.
            
For example:
            
```tut
def funnyAdderUpper(x: Int, y: Int): Int = (x + y) - (2 * y)
           
val result = 8 * funnyAdderUpper(3, 4)
```
            
which by substitution is exactly the same as
            
```tut
val result = 8 * ((3 + 4) - (2 * 4))
```
            
ie
 
```tut
val result = -8
```
            
Fair enough. What if `funnyAdderUpper` had a side effect?
            
```tut
var m: Int = 0
            
def badAdder(x: Int, y: Int): Int = {
  val z = (x + y) - (2 * y) + m
  m = x
  z
}
                    
val result1 = 8 * badAdder(3, 4)
val result2 = 8 * badAdder(3, 4)
```
                    
The problem here is substituting badAdder doesn't tell the whole story, there isn't a way to substitute `m` anywhere in this bit of code. Also, every time I call this function, I get a different result.
                    
> functions shouldn't have side effects
                    
Because of referential transparency, you should be able to inline every part of your code and end up with the same program (er.... conceptually... don't actually do it probably won't be very nice to read)
                    
A good way to tell if a function is side effecting is to look at it's type signature (types are important in functional languages and their type systems are normally very advanced... good blog material). If a type signature includes a `Unit` (`void` in Java), then it's almost certainly side effecting.
                    
```tut
def probablyMutatesSomething[A](value: A): Unit = ???
                    
def probablyGetsAMutableValue[A](): A = ???
```
                    
Here it's easy to see with `probablyMutatesSomething` that it's side effecting, if it's not returning anything, then what's the code doing? It can only be changing state somewhere. The same goes for `probablyGetsAMutableValue`, if it doesn't need a value to compute, then what's it doing? If it was returning a value which doesn't mutate, then why have it at all? It's probably getting a mutable value (and no doubt doing other naughty things as well).
                    
Exceptions are a weird one. I've included it here even though they are used in purely functional languages, but bear with me, I have a point. Exceptions in FP mean "something went very wrong and I can't recover". That's it. In my opinion this is also they should also be used in impertive programs. However, that's not always the case and it's very common to see exceptions used as almost a second return value.
                    
For example, how often have you seen code like this?
                    
```tut
case class Client(id: Int, balance: Int)

val premiumAccountIds = List(1, 2, 3, 4)

def hasCredit(c: Client): Boolean = ???
                    
def canWithdrawFunds(c: Client): Boolean = {
  if (premiumAccountIds contains c.id)
    hasCredit(c)
  else
    throw new IllegalArgumentException("Client " + c.id + " is not a premium account holder")
}
```
                               
Where exceptions are used to deal with normal control flow. You might often see this in a REST api, where the exception is thrown all the way up to the controller.
                                
Aside from a code smell, this code isn't referentially transparent. This function should return a `Boolean`, but instead can also return an `IllegalArgumentException`.
                          
### So what's the point of all this?
                                
In this post I've mostly taken things away from you. I've limited what tools you can use rather than made your job easier as a developer. How is that in any way useful?
                                
Well, I want to get us to the point where we can use mathematical functions in our code. Why? Well firstly, wouldn't it be cool if we could use the last hundred years of accedemic research into set theory and category theory - well we can do that if we use mathematical functions in our code.
                                
Normally the ideas that are in maths aren't trivial - in fact that's why people wrote papers in them.
                                
### λ

## Conclusions                                


Next up, tools of the trade...
