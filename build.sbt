name := "hamishdickson.github.io"

version := "1.0"

scalaVersion := "2.11.8"

tutSettings

libraryDependencies += "org.typelevel" %% "cats" % "0.7.0"

tutSettings

tutSourceDirectory := baseDirectory.value / "tut"

tutTargetDirectory := baseDirectory.value / "_posts"
