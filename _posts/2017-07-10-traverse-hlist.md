---
layout: post
title:  "Traverse and HLists"
date:   2017-07-10 08:00:00 +0100
categories: traverse hlist
---

> There are two basic answers to "how do I" questions in Scala. One is "don't do that". The other is "traverse".
> - Rúnar Bjarnason

This tweet from Rúnar sums it up - traverse is awesome, but say you had a tuple or a case class, can you do a traverse over the elements?

Sure you can!

# Quick reminder about traverse and sequence

When dealing with real world programs it's pretty common to get into a situation where you have a `List` of `Option`s. Maybe you got there through accessing a database or perhaps they were passed in via a REST api

```scala
scala> val ls: List[Option[Int]] = List(Some(1), Some(2))
ls: List[Option[Int]] = List(Some(1), Some(2))
```

But now you've gathered everything in your `List`, what you really want to know is does everything have a value or not?

ie you have a `List[Option[T]]` and you now need want a `Option[List[T]]`.

Sometimes after you've done this, you also want to perform a `map` on your new data.

```scala
scala> todo
<console>:13: error: not found: value todo
       todo
       ^
scala> implement traverse and sequence at the value level
<console>:13: error: not found: value implement
       implement traverse and sequence at the value level
       ^
<console>:13: error: not found: value and
       implement traverse and sequence at the value level
                          ^
<console>:13: error: not found: value at
       implement traverse and sequence at the value level
                                       ^
<console>:13: error: not found: value value
       implement traverse and sequence at the value level
                                              ^
```

# What about HList?

```scala
scala> description of HLists
<console>:13: error: not found: value description
       description of HLists
       ^
<console>:13: error: not found: value HLists
       description of HLists
                      ^
scala> walk through how to do traverse on an HList
<console>:2: error: illegal start of simple expression
walk through how to do traverse on an HList
                    ^
scala> poly
<console>:13: error: not found: value poly
       poly
       ^
```
