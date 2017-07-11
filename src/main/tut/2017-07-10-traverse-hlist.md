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

# Quick reminder about traverse
