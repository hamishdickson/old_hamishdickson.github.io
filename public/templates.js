angular.module("MyApp").run(["$templateCache", function($templateCache) {$templateCache.put("views/about.html","<div class=\"about-page\">\n    <div class=\"col-md-12\">\n        <div>\n            <h1>Hamish Dickson</h1>\n        </div>\n\n        <div>\n            <div class=\"col-md-4\">\n                <img src=\"http://www.gravatar.com/avatar/4cfce72158cd5741f0a48e67483b85e8?s=250\"\n                     class=\"img-responsive\">\n            </div>\n            <div class=\"col-md-8\">\n\n                <h3>TL; DR</h3>\n\n                <p>I am a developer for a financial software house based in London, England. I got here via a physics\n                    degree at Imperial College London and an interest in learning new things.</p>\n\n                <p>I can\'t make much of what I do at work public, but I spend a huge amount of my free time coding or\n                    reading about new things which may or may not end up as code - I put almost all of that up here.</p>\n\n                <p>As a child all over the world - including a 11 year stint in New Zealand - but for the last 13 years\n                    I\'ve been based in London, doing the learning thing and then the \"oh no, I\'d better earn some money\n                    so I can eat\" thing.</p>\n            </div>\n            <div class=\"col-md-12\">\n                <hr>\n                <h2>In brief</h2>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div>\n                    <i class=\"fa fa-graduation-cap fa-3x\"></i>\n                </div>\n                <div>\n                    <h3>I\'m always learning</h3>\n                    <p>I\'m one of those people that\'s always trying to learn new things and has some new wacky book in\n                        his hand. Right now I\'m mid way through a book on machine learning, another on refactoring\n                        and a third on quantum information theory.\n                    </p>\n                    <p>It\'s really important to me that I stay challenged and keep learning. I actually\n                        consider a day without learning a wasted day.</p>\n                </div>\n\n            </div>\n\n            <div class=\"col-md-4\">\n                <div>\n                    <i class=\"fa fa-terminal fa-3x\"></i>\n                </div>\n\n                <div>\n                    <h3>I love to code</h3>\n\n                    <p>The best part of my day is when I\'m coding.</p>\n                </div>\n            </div>\n\n            <div class=\"col-md-4\">\n                <div>\n                    <i class=\"fa fa-wrench fa-3x\"></i>\n                </div>\n                <div>\n                    <h3>I\'m a self starter</h3>\n\n                    <p>I\'m constantly described as a \"self starter\" and naturally like to pick things up and try them\n                        out.\n                        I\'m at my best when I\'m told to go away and work something out.</p>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"col-md-12\">\n            <hr>\n            <h3>Non-geeky stuff</h3>\n\n            <p>I\'m not a total nerd all the time - I\'m really into my rugby and lacrosse. I also like beer.</p>\n        </div>\n\n\n        <div class=\"col-md-12\">\n            <hr>\n            <h3>More about me</h3>\n\n            <h4>What interests me</h4>\n\n            <p>I\'ve recently finished Andrew Ng\'s excellent Machine Learning coursera course. I found this fascinating\n                and would love to know more or work on an interesting machine learning problem (I\'ve been trying to find\n                something open source to contribute to, but so far haven\'t found anything that catches my eye).</p>\n\n            <p>I\'d really like to know more about genetics, how the brain works and biology in general - I think this\n                area\n                has a lot of untapped potential for interesting maths and computer modelling.</p>\n\n            <p>Turbulence and fluid dynamics are very interesting to me, we know the small picture very well (we know\n                how individual molecules should act), but when the system gets above a certain size everything goes out\n                the\n                window and we have to make very general guesses as to what will happen.</p>\n\n            <p>I did physics at university and still absolutely love it. I still read a lot of physics and\n                maths.</p>\n\n            <hr>\n            <h4>What I\'m good at</h4>\n\n            <p>I\'m really at my best when given a \"go away and solve this\" problem.</p>\n\n            <p>I\'m good at teaching. Over the last few years I have taught lots of new graduates to code and\n                analyse problems.</p>\n\n            <p>No one can work on their own all the time, I\'ve always been good at working with people (I\'m\n                a fan of pair programming) and I\'m very good at getting my ideas across to people.</p>\n            <hr>\n        </div>\n\n        <div class=\"col-md-12\">\n\n            <h3>Learning</h3>\n\n            <p>Keeping on top of new ideas and concepts is very important as a programmer, you have to\n                constantly be out\n                learning new things (this fits my personality well, so I\'m pretty happy with it!)</p>\n\n            <div>\n\n                <h4>What I\'m learning at the moment</h4>\n\n                <ul>\n                    <li>Machine Learning</li>\n                    <li>Clojure</li>\n                    <li>Scala</li>\n                </ul>\n\n            </div>\n            <div>\n                <h4>What I\'m planning to learn next</h4>\n                <ul>\n                    <li>Modeling some physics problems</li>\n                </ul>\n\n            </div>\n\n            <div>\n\n                <h4>What I\'m reading right now</h4>\n\n                <ul>\n                    <li>Refactoring: Improving design of existing code, Martin Fowler</li>\n                    <li>Clojure for Machine Learning, Akhil Wali (my notes for which are <a\n                            href=\"https://github.com/hamishdickson/clojure-machine-learning\"\n                            target=\"_blank\">here</a>)\n                    </li>\n                    <li>Incompleteness, Nonlocality and Realism, Redhead. A book detailing the limits of Quantum\n                        Mechanics\n                    </li>\n                </ul>\n            </div>\n\n            <hr>\n        </div>\n\n        <div class=\"col-md-12\">\n            <h3>Contact and history</h3>\n\n            <p>It\'s pretty easy to get in touch with me - probably the best way is email, or if you\'d like to know more\n            then linkedIn is a good place to start too.</p>\n\n            <p><a href=\"mailto: hamish.dickson@gmail.com\">EMAIL/hamish.dickson@gmail.com</a>\n                |\n                <a href=\"https://github.com/hamishdickson\">GITHUB/HAMISHDICKSON</a>\n                |\n                <a href=\"uk.linkedin.com/in/hamishdickson\">LINKEDIN/HAMISHDICKSON</a>\n            </p>\n\n            <h4>Work</h4>\n            <ul>\n                <li><strong>JHC Systems</strong>, java developer, 2014 - present</li>\n                <li><strong>JHC Systems</strong>, senior analyst programmer, 2008 - 2014</li>\n            </ul>\n\n            <h4>Education</h4>\n            <ul>\n                <li><strong>Imperial College London</strong>, Quantum Fields and Fundamental Forces</li>\n                <li><strong>Imperial College London</strong>, Physics with Theoretical Physics</li>\n            </ul>\n\n            <hr>\n        </div>\n\n        <div class=\"col-md-12\">\n            <h3>About this site</h3>\n            <p>I\'ve built this site using angularjs and angular-strap. I\'ve used SASS to help make the css readable.</p>\n            <hr>\n        </div>\n    </div>\n    <div id=\"foots\">\n        <div class=\"col-sm-6\">\n            <p class=\"text-muted footer-text\">Hamish is a developer based in London, England.</p>\n        </div>\n        <div class=\"col-sm-6\">\n            <ul class=\"footer-links\">\n                <li><a href=\"https://github.com/hamishdickson\" target=\"_blank\" class=\"text-muted\">GH/HAMISHDICKSON</a></li>\n                <li><a href=\"uk.linkedin.com/in/hamishdickson\" target=\"_blank\" class=\"text-muted\">LINKEDIN/HAMISHDICKSON</a></li>\n            </ul>\n        </div>\n    </div>\n</div>");
$templateCache.put("views/cv.html","<!-- ========================================================================== -->\n<div class=\"col-sm-12\">\n    <div id=\"cv\" class=\"print-cv\">\n        <h2>My CV</h2>\n        <a href=\"javascript:window.print()\">\n            <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-print\"> Print my CV</i></button>\n        </a>\n    </div>\n\n    <hr>\n\n    <div>\n        <h2>Hamish Dickson</h2>\n\n        <div>\n            <hr>\n            <h3>Technology Summary</h3>\n\n            <div class=\"col-md-12\">\n                <div class=\"col-md-4\">\n                </div>\n                <div class=\"col-md-8\">\n                    <h5>Languages/Programming:</h5>\n\n                    <p>Java, Javascript/node.js, HTML/CSS, SQL, Groovy, Python, Scala</p>\n                    <h5>Systems:</h5>\n\n                    <p>as400, Linux, Unix, OSX, Windows</p>\n                    <h5>Databases:</h5>\n\n                    <p>DB2</p>\n\n                    <h5>Frameworks</h5>\n\n                    <p>JUnit, Spring, Jersey, Swagger</p>\n\n                    <h5>Build tools</h5>\n\n                    <p>Maven, npm, SBT</p>\n\n                    <h5>VCS</h5>\n\n                    <p>Git, Subversion</p>\n                </div>\n            </div>\n        </div>\n\n        <div>\n            <hr class=\"col-md-12\">\n            <h3>Education</h3>\n\n            <div class=\"col-md-12\">\n                <div class=\"col-md-4\">\n                    <h4>Imperial College London</h4>\n                </div>\n                <div class=\"col-md-8\">\n                    <h5>MSc Quantum Fields and Fundamental Forces</h5>\n                    <h6>2006 - 2007</h6>\n\n                    <p>Subjects studied include: String Theory, Supersymmetry, Black Holes, Quantum Information Theory\n                        Dissertation topic: Boundary Limits of Quantum Information Theory</p>\n\n                    <hr>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n                <h4>Imperial College London</h4>\n            </div>\n            <div class=\"col-md-8\">\n                <h5>MSci Physics with Theoretical Physics (2.1)</h5>\n                <h6>2002 - 2006</h6>\n\n                <p>4th year modules include: General Relativity, Advanced Particle Physics, Quantum Field Theory,\n                    Unification, Group Theory.\n                    Dissertation topic: Decoherence and Topos Theory</p>\n\n                <hr>\n            </div>\n        </div>\n\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n                <h4>Rossett School, Harrogate</h4>\n            </div>\n            <div class=\"col-md-8\">\n                <h5>A-levels</h5>\n                <h6>2000 - 2002</h6>\n\n                <p>Maths (A), Further Maths (A), Physics (A)</p>\n\n            </div>\n        </div>\n    </div>\n\n\n    <div>\n\n        <hr class=\"col-md-12\">\n        <h3>Professional Experience</h3>\n\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n                <h4>JHC Systems</h4>\n                <h5>08/2008 - present</h5>\n            </div>\n\n            <div class=\"col-md-8\">\n                <p>JHC produce the financial software needed by investment banks to carry out their business, that goes\n                    from the back office database all the way through to the client facing web sites and document\n                    reporting.\n                    I joined JHC as a university graduate, over time became a Senior Analyst Programmer and finally\n                    concentrated\n                    in java development.</p>\n\n                <h4>Java Developer</h4>\n                <h5>2014 - present</h5>\n\n                <p>Specialising in building websites and REST apis.</p>\n\n                <p>Work in teams of 4-6 using an agile (and JIRA) methodology.</p>\n\n                <p>Recent developments include: a large refactoring of a piece of software designed to obtain prices\n                    from\n                    the market, new trading sites for Jarvis IM and Brooks Macdonald (both recently live),\n                    setting up a new Jenkins continuous integration build server with groovy.</p>\n\n                <p>As with everyone in my team, I perform code reviews (along with having my code reviewed) and write\n                    unit tests (using TDD where possible). I am also the deputy functional architect for the stock\n                    database.</p>\n\n                <hr>\n            </div>\n        </div>\n\n\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n            </div>\n            <div class=\"col-md-8\">\n                <h4>Senior Analyst Programmer</h4>\n                <h5>2008 - 2014</h5>\n\n                <p>Responsibilities included</p>\n                <ul>\n                    <li>Meeting existing and potential clients to discuss their needs and gather requirements</li>\n                    <li>Writing specifications and software documentation (both technical and non-technical). This\n                        includes detailing functionality of the system, creating UML diagrams and entity relationship\n                        diagrams.\n                    </li>\n                    <li>Research and prototype new software and presenting findings.</li>\n                    <li>Demonstrating new technology to technical and non-technical audiences</li>\n                    <li>Create new software, test it and support it after release</li>\n                    <li>As an experienced developer, I spend a lot of time mentoring and teaching. At the moment I am\n                        teaching a graduate class with the aim to improve the quality of software. I also spend a lot of\n                        time helping more senior members of staff\n                    </li>\n                    <li>I have been given the extra responsibility of being the deputy Function Architect for the stock\n                        database. This involves reading and approving\n                        specifications, discussing client requirements and making decisions on the impact of functional\n                        changes to the system\n                    </li>\n                    <li>I have lead my team (14 people) for up to 6 weeks at a time.</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div>\n        <hr class=\"col-md-12\">\n        <div class=\"col-md-12\">\n            <h3>Qualifications</h3>\n\n            <div class=\"col-md-4\">\n                <h4>Professional Qualifications</h4>\n            </div>\n            <div class=\"col-md-8\">\n                <p>Oracle Certified Professional, Java SE6 Programmer</p>\n\n                <p>ISEB Foundation Certificate in Software Testing</p>\n\n                <p>IAQ (now IOC) Certification</p>\n\n                <hr>\n            </div>\n            <div class=\"col-md-4\">\n                <h4>Coursera</h4>\n            </div>\n            <div class=\"col-md-8\">\n                <p><a href=\"https://www.coursera.org/\" target=\"_blank\">Coursera</a> is a free online learing tool.\n                    Courses are run from all over the world and take on a huge range\n                    of subjects.</p>\n\n                <h5>Machine Learning, Stanford</h5>\n                <h6>12/2014</h6>\n\n                <p>An introduction to the main concepts of modern Machine Learning.</p>\n\n                <p>You can find more about the course <a href=\"https://class.coursera.org/ml-007\"\n                                                         target=\"_blank\">here</a>.</p>\n\n                <hr>\n\n                <h5>Functional Programming Principles in Scala, École Polytechnique Fédérale de Lausanne</h5>\n                <h6>06/2014</h6>\n\n                <p>This course was presented by Martin Odersky, one of the founders of the Scala programming language.\n                    It taught\n                    functional programming principles with Scala used for the assessments.</p>\n\n                <p>You can find out more about the course <a href=\"https://class.coursera.org/progfun-004\"\n                                                             target=\"_blank\">here</a>.</p>\n\n                <hr>\n\n                <h5>Cryptography 1, Stanford</h5>\n                <h6>06/2013</h6>\n\n                <p>An introduction to cryptography. With homeworks set in Python.</p>\n\n                <p>You can find out more about the course <a\n                        href=\"https://class.coursera.org/crypto-2012-002/wiki/Overview\" target=\"_blank\">here</a>.</p>\n\n            </div>\n        </div>\n    </div>\n\n    <div>\n        <hr class=\"col-md-12\">\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n                <h3>Responsibilities and Interests</h3>\n            </div>\n            <div class=\"col-md-8\">\n                <h5>Lacrosse</h5>\n\n                <p>I\'m a member of Purley Lacrosse Club (Southern Premiership)</p>\n\n                <h5>London Code Craftsmanship Meetup Group</h5>\n\n                <p>This is a meetup group where programmers discuss and show different programming techniques.</p>\n\n            </div>\n        </div>\n    </div>\n\n    <div>\n        <hr class=\"col-md-12\">\n        <div class=\"col-md-12\">\n            <div class=\"col-md-4\">\n                <h3>References</h3>\n            </div>\n            <div class=\"col-md-8\">\n                <p>Available upon request</p>\n            </div>\n        </div>\n    </div>\n\n    <div id=\"foots\">\n        <div class=\"col-sm-6\">\n            <p class=\"text-muted footer-text\">Hamish is a developer based in London, England.</p>\n        </div>\n        <div class=\"col-sm-6\">\n            <ul class=\"footer-links\">\n                <li><a href=\"https://github.com/hamishdickson\" target=\"_blank\" class=\"text-muted\">GH/HAMISHDICKSON</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>");
$templateCache.put("views/home.html","<div class=\"col-sm-12 meeeee\">\n    <h1>Hamish Dickson</h1>\n</div>\n\n<div class=\"col-sm-6\">\n    <h2>My code</h2>\n    <p>I like to code out in the open, have a look at it <a href=\"https://github.com/hamishdickson\" target=\"_blank\">here</a></p>\n</div>\n\n\n<div class=\"col-sm-6\">\n    <h2>My projects</h2>\n    <p>I have just published my first npm module, check it out <a href=\"https://www.npmjs.com/package/whats-goin-on\" target=\"_blank\">here</a></p>\n</div>\n\n\n<!--\n<instgram class=\"col-sm-12\"></instgram>\n-->\n");
$templateCache.put("views/instagram.html","<div class=\"panel col-md-6\">\n    <h2>instagram feed</h2>\n\n    <div ng-repeat=\"pic in pics\">\n        <img ng-src=\"{{pic.images.low_resolution.url}}\" class=\"img-responsive thumbnail\" title=\"{{pic.caption.text}}\">\n    </div>\n</div>");
$templateCache.put("views/projects.html","<div class=\"col-md-12\">\n\n    <h3>My projects and code</h3>\n\n    <p>I love open source software and try to make as much of my own software publically available as possible.\n        GitHub is brilliant for that, so you can find a lot of what I\'m allowed to\n        publish <a href=\"https://github.com/hamishdickson\" target=\"_blank\">over here</a>.</p>\n\n    <p>Much of this code is what could be described as \"code for learning\" - meaning in of it self it\'s not\n        terribly useful, but it\'s good reference material.</p>\n\n    <div>\n        <h4>whats-goin-on - javascript</h4>\n\n        <p>A command line tool to find out what your friends are up to on github</p>\n\n        <p>This is the first thing I\'ve published on npm and although it\'s only a very simple command line tool, people\n            seem to be using it - it got over 300 downloads in it\'s first week. As with everything else I do, it\'s open\n            source and you can\n            <a href=\"https://github.com/hamishdickson/whats-goin-on\" target=\"_blank\">view the code here</a> or you can\n        download it and use it yourself <a target=\"_blank\" href=\"https://www.npmjs.com/package/whats-goin-on\">with npm</a></p>\n\n        <hr>\n    </div>\n\n    <div>\n        <h4 id=\"gol\">game of life - java, javascript</h4>\n\n        <p>For those who are sharp eyed, you may have noticed the background of this site changes like some kind of weird\n        game of tetris ... well it\'s actually an implementation of Conway\'s game of life. It\'s a very very simple model of\n        life where \"cells\" which are overcrowded die as do those who are undercrowded ... but those with just the right\n        number of neighbours live.</p>\n\n        <p>There is an excellent description of it <a href=\"http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life\"\n                                                      target=\"_blank\">on wikipedia</a>, or you can see my java version\n        of it <a target=\"_blank\" href=\"https://github.com/hamishdickson/game-of-life\">here</a></p>\n\n        <hr>\n    </div>\n\n    <div>\n        <h4>BurnupPrototype - Matlab</h4>\n\n        <p>Using Machine Learning to judge when your next agile project will finish.</p>\n\n        <p><a href=\"https://github.com/hamishdickson/burnupPrototype\" target=\"_blank\">View the code here</a></p>\n        <hr>\n    </div>\n\n    <div>\n        <h4>Jobs5 - javascript</h4>\n\n        <p>A job tracker helping keep track of what you\'re working on.</p>\n\n        <p><a href=\"https://github.com/hamishdickson/jobs5\" target=\"_blank\">View the code here</a></p>\n\n        <hr>\n    </div>\n\n    <div>\n        <h4>Figdoc - python</h4>\n\n        <p>A bulk PDF generator for mass reporting.</p>\n\n        <p><a href=\"https://github.com/hamishdickson/Figdoc\" target=\"_blank\">View the code here</a></p>\n        <hr>\n    </div>\n\n    <div id=\"foots\">\n        <div class=\"col-sm-6\">\n            <p class=\"text-muted footer-text\">Hamish is a developer based in London, England.</p>\n        </div>\n        <div class=\"col-sm-6\">\n            <ul class=\"footer-links\">\n                <li><a href=\"https://github.com/hamishdickson\" target=\"_blank\" class=\"text-muted\">GH/HAMISHDICKSON</a></li>\n                <li><a href=\"uk.linkedin.com/in/hamishdickson\" target=\"_blank\" class=\"text-muted\">LINKEDIN/HAMISHDICKSON</a></li>\n            </ul>\n        </div>\n    </div>\n</div>");}]);