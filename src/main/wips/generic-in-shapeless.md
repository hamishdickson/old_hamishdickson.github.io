---
layout: post
title:  "Generic in shapeless"
date:   2016-12-17 08:00:00 +0100
categories: generic programming
---

Problem: You have some class which is deserialized into JSON

```tut
object ImportantGlobalStuff {
  case class User(firstName: String, lastName: String)
}

object Foo {
  import ImportantGlobalStuff.User

  case class Profile(user: User, location: String, age: Int)
}
```

`Profile` here takes a `User`. `User` is an important concept in our program so we don't want to add the concept of an image to it, even though the hipster front end guys are asking for it.

So what do you do?

Well subclass polymorphism is considered bad practice, so extending `User` and adding a field is out.

The obvious (and probably correct) solution is to create a new class and add the image there, like so:

```tut
object Foo {
  import ImportantGlobalStuff.User

  case class User2(firstName: String, lastName: String, image: String)

  case class Profile(user: User2, location: String, age: Int)
}
```

OK cool that works, can we go home now?

Wait, that'll work if you have only one or two fields, but what if there are quite a few more than that?

And more importantly, is there something cooler we can use?

## Shapeless to the rescue

```scala
scala> case class Foo(s: String, i: Int)
defined class Foo

scala> case class Bar(b: Boolean, s: String, i: Int)
defined class Bar

scala> val foo = Foo("this is a foo", 1)
foo: Foo = Foo(this is a foo,1)

scala> val fooRepr = Generic[Foo].to(foo)
fooRepr: shapeless.::[String,shapeless.::[Int,shapeless.HNil]] = this is a foo :: 1 :: HNil

val bar = Generic[Bar].from(false :: fooRepr)
bar: Bar = Bar(false,this is a foo,1)
```
