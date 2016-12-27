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

  case class User2(imageLocation: String, firstName: String, lastName: String)

  case class Profile(user: User2, location: String, age: Int)

  val p: Profile = Profile()
}
```

OK cool that works, can we go home now?

Wait, that'll work if you have only one or two fields, but what if there are quite a few more than that?

And more importantly, is there something cooler we can use?

## Shapeless to the rescue

Lets stand back for a second and have a look at what we have.

We want to break apart Foo and give it another element ... so what's the type


```tut
case class Foo(s: String, i: Int)
```

we have a thing that is made up of a `String` and an `Int` ... and we want

```tut
case class Foo2(b: Boolean, s: String, i: Int)
```

a thing with a `Boolean` and the same `String` and `Int` from `Foo`.

The shape is very similar.

```tut
val foo = Foo("this is a foo", 1)
```

```tut
val fooRepr = Generic[Foo].to(foo)

val bar = Generic[Bar].from(false :: fooRepr)
```
