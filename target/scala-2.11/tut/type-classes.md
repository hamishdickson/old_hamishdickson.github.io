---
layout: post
title:  "Type classes in Scala"
date:   2016-06-05 08:44:26 +0100
categories: scala
---

Type classes are an idea which comes from Haskell.

Ad-hoc polymorphism

## Equality

In java, each class has an `equals` (and `hashCode`) method. Those methods let you compare two instances and decide if they are equal.


How would we approach defining equals here?
```
case class Foo[A](a: A)
```

Sounds easy... what about this?
```
case class Foo[A,B](f: A => B)
```

Does equality make sense? Turing showed you can't do this in general without solving the Halting problem

```scala
scala> def elem[A](x: A, ys: A): Boolean = ys match {
     |     case Nil => false
     |     case y :: ys => x == y || elem(x, ys)
     | }
elem: [A](x: A, ys: A)Boolean
```

----
## Notes

- history
- what it gives you
- why you would want it over subtype polymorphism
- java's == isn't referentially transparent

```Haskell
x `elem` [] = False
x `elem` (y:ys) = x == y || (x `elem` ys)
```

What is the type of this? You think it would be

```Haskell
a -> [a] -> Bool
```

But `==` isn't defined for all types... and the above would imply it has type `a -> a -> Bool`

Comparing two lists of strings is different from comparing two lists of integers, it would be overloaded

Type classes to the rescue

```Haskell
class Eq a where
  (==) :: a -> a -> Bool
```

Eq is the name of the type class
