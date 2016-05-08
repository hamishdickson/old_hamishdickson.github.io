# Demystifying Functional Programming

## Part 1 - ehy?

OK, so you've heard about this thing called Functional Programming. All you really know about it is it involves a beard, having strong opinions about coffee and waving your arms about a lot while saying "monad!". What's it all about? What does it offer me that my current way of programming doesn't?

The aim of this series of blog posts is to try to answer that and demystify the core ideas behind FP. I'm going to assume you have some experience with a language like Java or PHP, but have never really read into FP and want to find out more.

I like to use Scala to demonstrate ideas in FP. If you don't know Scala, don't that it put you off, Scala's syntax for FP is nice and clean (unlike Java 8) but at the same time not too alien (I thought about doing this in Haskell, but decided that I'd spend too much time trying to explain syntax, which is not the goal here.) for most developers. The idea here is to get the ideas across without getting too bogged down in the syntax of the tool we're using.

This first post is going to concentrate on the what and why... so let's get cracking.

## What is Functional Programming?

In my experience people worry about this question way too much, but I've broached the topic so let's talk about it anyway.

> Functional programming is coding with mathematical functions.

Cool. Wait... what the hell does that actually mean? 

### Mutable state bad

Consider this bit of code:

```
x = x + 1
```

Now, you've probably written something like that 100 times in the last year alone, but have you ever thought about it from a mathematical point of view? Well, let's do it now

```
    x = x + 1
        
x - x = 1
        
    0 = 1
```
            
Which hopefully you agree is nonsense. If you had been working on a problem and found yourself on this line you would probably conclude that you had messed up somewhere! Yet it's a valid thing to do in your code?!
            
"Ah, but Hamish" you say "that's not what I'm doing here" you say "what I'm doing is taking a variable and assigning it a new value". You don't do that in maths, it's not really even a concept. A value is a value, once you've worked out what it is you can't change it!
            
In terms of code that means
            
> Values don't mutate.
            
And actually in OO languages that is expanded to
            
> State doesn't mutate.
            
Most people consider this to be one of the big wins of using FP. If you avoid mutable state, then you avoid whole suites of bugs in your code. You simply don't get race conditions, you also avoid bugs where variables aren't set (in FP you set variables when you define them).
            
Still not convinced? Got programs with mutable state all up the wazzoo and not got problems? Well let's keep going.
            
### Side effects
            
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
scala>  def funnyAdderUpper(x: Int, y: Int): Int = (x + y) - (2 * y)
funnyAdderUpper: (x: Int, y: Int)Int

scala>  val result = 8 * funnyAdderUpper(3, 4)
result: Int = -8
 ```
            
 which by substitution is exactly the same as
            
 ```tut
scala>  val result = 8 * ((3 + 4) - (2 * 4))
result: Int = -8
 ```
            
 ie
            
 ```tut
scala>  val result = -8
result: Int = -8
 ```
            
 Fair enough. What if `funnyAdderUpper` had a side effect?
            
 ```tut
scala>  var m: Int = 0
m: Int = 0

scala>  def badAdder(x: Int, y: Int): Int = {
     |      val z = (x + y) - (2 * y) + m
     |      m = x
     |      z
     | }
badAdder: (x: Int, y: Int)Int

scala> val result1 = 8 * badAdder(3, 4)
result1: Int = -8

scala> val result2 = 8 * badAdder(3, 4)
result2: Int = 16
```
                    
The problem here is substituting badAdder doesn't tell the whole story, there isn't a way to substitute `m` anywhere in this bit of code. Also, every time I call this function, I get a different result.
                    
> functions shouldn't have side effects
                    
Because of referential transparency, you should be able to inline every part of your code and end up with the same program (er.... conceptually... don't actually do it probably won't be very nice to read)
                    
A good way to tell if a function is side effecting is to look at it's type signature (types are important in functional languages and their type systems are normally very advanced... good blog material). If a type signature includes a `Unit` (`void` in Java), then it's almost certainly side effecting.
                    
```scala
scala> def probablyMutatesSomething[A](value: A): Unit = ???
probablyMutatesSomething: [A](value: A)Unit

scala> def probablyGetsAMutableValue[A](): A = ???
probablyGetsAMutableValue: [A]()A
```
                    
Here it's easy to see with `probablyMutatesSomething` that it's side effecting, if it's not returning anything, then what's the code doing? It can only be changing state somewhere. The same goes for `probablyGetsAMutableValue`, if it doesn't need a value to compute, then what's it doing? If it was returning a value which doesn't mutate, then why have it at all? It's probably getting a mutable value (and no doubt doing other naughty things as well).
                    
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
                               
Where exceptions are used to deal with normal control flow. You might often see this in a REST api, where the exception is thrown all the way up to the controller.
                                
Aside from a code smell, this code isn't referentially transparent. This function should return a `Boolean`, but instead can also return an `IllegalArgumentException`.
                          
### So what's the point of all this?
                                
In this post I've mostly taken things away from you. I've limited what tools you can use rather than made your job easier as a developer. How is that in any way useful?
                                
Well, I want to get us to the point where we can use mathematical functions in our code. Why? Well firstly, wouldn't it be cool if we could use the last hundred years of accedemic research into set theory and category theory - well we can do that if we use mathematical functions in our code.
                                
Normally the ideas that are in maths aren't trivial - in fact that's why people wrote papers in them.
                                
### λ
## Conclusions                                
