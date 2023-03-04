<a id='top'></a>
# BYU-CS260 Notes
## Assignment Write-up Quick Links:
### Development essentials
- [Github](#github)
- [Startup - Specifications](#startup-specifications)
### Web servers
- [Amazon Web Sevices - EC2](#aws-ec2)
- [Amazon Web Sevices - Route 53](#aws-r53)
- [HTTPS, TLS, and certificates](#https)
### HTML and CSS
- [HTML Introduction](#html-introduction)
  - [HTML Structure](#html-structure)
  - [HTML Input](#html-input)
  - [HTML Media](#html-media)
  - [HTML Website](#html-website)
  - [Simon HTML](#simon-html)
- [CSS Practice](#css-practice)
  - [CSS Flex](#css-flex)
  - [CSS Frameworks](#css-frameworks)
  - [Simon CSS](#simon-css)
- [UX Desgin](#ux-design)
### JavaScript
- [JS Types, Operators, Conditionals, and Loops](#js-TOCL)
  - [JS Functions](#js-functions)
  - [JS Arrow Functions](#js-arrow-functions)
  - [JS Arrays](#js-arrays)
  - [JS Objects and Classes](#js-objects-classes)
  - [JS Regular Expressions](#js-regex)
  - [JS Rest and Spread](#js-rest-spread)
  - [JS Destructuring](#js-destructuring)
  - [JS Exceptions](#js-exceptions)
  - [JS Document Object Model (DOM)](#js-dom)
  - [JS Promises](#js-promises)
  - [JS Async/Await](#js-async-await)

<details>
  <summary>🚧 Assignments that are not yet completed</summary>
  <br>
 
- [Startup - HTML, CSS](#startup-html-css)
 
- [Simon JavaScript](#simon-js)
- [Startup - JavaScript](#startup-js)
</details>

<a id='github'></a>
## Github
#### William Pendleton Learned:
One of the thigns that I appreciate about this assignment is that it is important to commit changes OFTEN! And I also appreciate that you it talked about how to resolve conflicts. I have worked in the industy with people that have been working for years at a company and they still struggle to know how to resolve conflicts that come when merging data.

[Back to top](#top)
<a id='startup-specifications'></a>
## Startup 
Imagine planning your next vacation with the ability to preview destinations in a virtual reality street view before you even leave home. Our web and mobile app seamlessly integrates with WebXR's ThreeJS technology to give you an immersive, 360-degree experience of your potential vacation spots, complete with nearby points of interest. No more guessing what a location will be like, our app allows you to experience it for yourself in a virtual reality headset. It's the ultimate planning tool for any traveler looking to make the most out of their vacation.
- Ability to plan and preview vacation destinations in a virtual reality street view
- Integration with WebXR's ThreeJS technology for an immersive, 360-degree experience
- Suggestions for nearby points of interest
- Accessible via web and mobile
- Virtual reality headset compatibility
- User-friendly interface for easy vacation planning
- Search and filter options to find desired destinations and POIs
- Ability to save and share your virtual tours and vacation plans with friends and family
- Integration with travel booking and accommodation services for end-to-end vacation planning. (Include in Version 2.0)

### Website Logo 
![Artboard 1 copy 10-100](https://user-images.githubusercontent.com/57572263/215237804-f2932252-60c7-4d39-8f8c-723baf968f7e.jpg)
### Main Landing Page
![Artboard 1 copy 9-100](https://user-images.githubusercontent.com/57572263/215237819-a701fc6f-ebd0-4793-ab51-3a81a90f372b.jpg)
### Main User Page
![Artboard 1 copy 12-100](https://user-images.githubusercontent.com/57572263/215237823-7d2a5f90-b975-41a5-8fa5-4676c8c690d2.jpg)

### Startup Assignment Takeaways
#### William Pendleton Learned:
In creating the design for the Excursions website, I have learned the importance of user experience and design in web development. I began by researching existing travel planning websites and looking at their design elements and layouts. This helped me to understand what works well in terms of user navigation and functionality.

Throughout the design process, I learned about the importance of visual hierarchy, color theory, and typography in creating an aesthetically pleasing and user-friendly website. I also learned about the importance of responsive design, ensuring that the website looks and works well on various devices and screen sizes.

Additionally, I have learned the importance of user testing and getting feedback from potential users to ensure that the design meets their needs and expectations. This is essential for creating a successful web application.

Overall, the design process has been a valuable learning experience and has provided me with a deeper understanding of the principles of web design and user experience.

#### Daniel Yu Learned:
Paint.net (a piece of opensource freeware) is not the most powerful image editing tool, especially for graphical design. Brainstorming the visual aspects of a website or project is an intensive process.

[Back to top](#top)
<a id='aws-ec2'></a>
## Amazon Web Services - EC2
#### William Pendleton Learned:
In this assignment, I set up a new Amazon Web Services (AWS) instance and prepared it with an elastic IP address. This process allowed me to learn about the importance of using cloud-based infrastructure in web development and the benefits of using a service like AWS.

The process of creating a new AWS instance is relatively straightforward. I logged into the AWS Management Console, selected the EC2 service, and followed the prompts to create a new instance. Once the instance was created, I was able to ssh into it to make sure that everything was set up correctly.

I then associated an Elastic IP address with the instance, which allows for a static, public IP address that can be used to access the instance from anywhere. This is important for ensuring that the server is accessible to users and can be used to host a website or web application.

Overall, this assignment has provided me with a deeper understanding of the benefits and considerations of using cloud-based infrastructure in web development and the importance of security in these environments.

*Elastic IP address: 3.130.135.1*
</details>

#### Daniel Yu Learned:

Accessing a remote server remotely continues to be 'fun'. I always think its pretty cool to be able to access services and run programs on other machines other than the one I am sitting directly infront of. Between this, the BYU CS department lab machines, the servers I occasionally work on for work at BYU, and my own personal RunPod instances for beefy GPUs, I continue to learn more and have a blast.

Obviously, inconsistent IP addresses that are allocated as machines become active pose a problem. Even leaving an instance online 24/7 is unneccesarry and dangerous. This is why elastic IPs offer such an advantage, creating a continuous reference to your dynamic instances that remains under your name.

*Elastic IP address: 3.136.241.90*

[Back to top](#top)
<a id='aws-r53'></a>
## Amazon Web Services - Route53
#### William Pendleton Learned:
In this part of the assignment, I used the AWS browser console to log in and then used Route 53 to purchase a domain name. The domain name that I purchased is worldexcusions.click.

Route 53 is a service provided by AWS that allows users to manage their DNS records. This includes purchasing domain names, creating and managing DNS records, and monitoring the health of their domain.

After purchasing the domain name, I set up my DNS records using Route 53. This included creating a record representing my root domain name (worldexcusions.click) and a wildcard subdomain ((LiteralyAnything).worldexcusions.click). This allows for any subdomain to be used with the root domain, making it more flexible for the users.

I then tested that I could access my server using my domain name and any subdomain name. This confirmed that the DNS records were set up correctly and that my server is accessible using the domain name.

This part of the assignment has provided me with a deeper understanding of the process of purchasing and setting up a domain name and how to use Route 53 to manage DNS records. It also showed me how to test that the server is accessible using the domain name and any subdomain name.

Overall, this assignment has helped me to understand the importance of having a domain name and how to set it up and manage it properly.

*Domain: [http://worldexcursions.click](http://worldexcursions.click)*

#### Daniel Yu Learned:

Following the steps described in the documentation from Github posed no issues and I was able to purchase my domain name and get my own instance with relative ease. I know that AWS serves as the backbone to a lot of internet services and companies and so this first interaction is very informative and engaging.

Looking at the available domain names was fun and made me have to choose between cost and appearances. I was happy to secure a domain ending in .world, which feels pretty cool and relevant to our prospective start up project.

*Domain: [http://excursionsxr.world](http://excursionsxr.world)*

[Back to top](#top)
<a id='https'></a>
## HTTPS, TLS and web certificates
#### William Pendleton Learned:
In this part of the assignment, I learned about HTTPS, TLS, and web certificates. HTTPS (Hypertext Transfer Protocol Secure) is a protocol for secure communication over the internet. It is the preferred method of communication for sensitive information, such as online transactions or the exchange of personal information. TLS (Transport Layer Security) is the cryptographic protocol that is used to secure the data being transmitted over the internet.

The project was set up with Caddy, a web server that automatically requests and generates certificates from Let's Encrypt for all of the domains and subdomains of the website. This is a great advantage because it eliminates the need for manual certificate management, which can be time-consuming and error-prone.

In the past, I have had to set up servers and request certificates, and I know how much of a hassle it can be to make sure that the certificate covers all of the subdomains and switch between the development environment, which doesn't use HTTPS, to a production environment, which does. With Caddy and Let's Encrypt, the process is made much easier and more streamlined.

This part of the assignment has helped me to understand the importance of using HTTPS and TLS for secure communication and how Caddy and Let's Encrypt make the process of setting up certificates much easier and more efficient. Overall, this assignment has been a great learning experience and has provided me with a deeper understanding of the role of web certificates in secure communication.

#### Daniel Yu Learned:

Caddy is a nice solution for handling the aquisition of SSL certificates. In my workplace, we have to renew certificates from DigiCert every year or every other year, and it's quite a few more steps getting the certificates installed and placed. I'm wondering if Caddy can be configured to be used on our servers as well, but probably not, considering we don't use the more open and free solution. 

It's nice to have chrome no longer freak out when connecting to my domain. The TLS system is a different and interesting approach to handling the security problem that comes with being online. It, in combination with RSA encryption, likely are the backbone for modern information exchange.

[Back to top](#top)
<a id='html-introduction'></a>
## HTML Introduction
#### William Pendleton Learned:
In this assignment, we were introduced to HTML and its elements, tags, attributes and hyperlinks. HTML stands for Hypertext Markup Language and it is the standard markup language used to create web pages. It uses a set of tags to structure the content and tell the browser how to display it.

To demonstrate my understanding of HTML, I created a simple personal portfolio webpage. The webpage consisted of a header, an introduction section, an about me section, a section for my links and a footer.

In the header, I included the title of the webpage, "Hello world, This is me!". In the introduction section, I talked about myself and what I do. In the about me section, I listed out some of my skills and provided a brief description for each of them using unordered lists. In the links section, I included some important links. Finally, in the footer, I put a little not saying thank you.

By creating this simple HTML page, I learned how to use various HTML elements and tags to structure and display content on a webpage.

*Codepen Link: [Hello world](https://codepen.io/wpendl99/pen/vYabemq)*

#### Daniel Yu Learned:
This section was just a quick introduction to HTML and getting familiar with the conventions. Tags play a key role in forming the structure of webpages and also allowing webcrawling systems like search engines to catalogue and understand the content of your site.

[Back to top](#top)
<a id='html-structure'></a>
## HTML Structure
#### William Pendleton Learned:
In this assignment, I learned about HTML structure elements and their distinction between block and inline elements. The purpose of HTML is to provide structure and content to web applications, and common HTML structural elements include body, header, footer, main, section, aside, p, table, ol/ul, div, and span. Proper representation of the page structure using these elements is important for logical sense and for automated tools like search indexing crawlers and accessibility screen readers to correctly interpret the document. Block elements are meant to be distinct blocks in the flow of content, while inline elements are meant to be inline with the content flow of block elements. For example, a div block element could have an inline b element to bring attention to a portion of its sub-text, while a p element could have a span to mark the sub-text as a person's name.

*Codepen Link: [Sample Website Layout](https://codepen.io/wpendl99/pen/zYLepJw)*

#### Daniel Yu Learned:
Tags became more important here, as things like "reader mode" for iOS or MacOS take advantage of tags to determine the content of your page. There's many tools that exist for us to use to build our website, from top to bottom.

[Back to top](#top)
<a id='html-input'></a>
## HTML Input
#### William Pendleton Learned:
HTML inputs allow for user input on a website or web application. There are several types of inputs, including text inputs, checkboxes, radio buttons, drop-down menus, and submit buttons. HTML inputs are essential for collecting data from users, and they play a crucial role in web development.

One interesting aspect of HTML inputs is the versatility they offer in terms of data collection. Different input types cater to specific data requirements, and developers can choose the type that best fits their needs. For instance, a drop-down menu is ideal for offering a limited number of choices, while a text input allows for free-form data entry.

*Codepen Link: [Form for Ordering Ice Cream](https://codepen.io/wpendl99/pen/BaPMYjy)*

#### Daniel Yu Learned:
While it may not play a key role in what we do (as we will learn to use JS to perform a lot of these interactible tasks), forns served as the basis for user interaction with webpages and sending data back to webservers. While not present in the fork, and as something that may have to be implemented in JS, we need to perform clear and explicit error descriptions to prevent friction with users on our site.

[Back to top](#top)
<a id='html-media'></a>
## HTML Media
#### William Pendleton Learned:
In this lesson on HTML media elements, I learned about various ways to include multimedia in a web page. The main media elements are img, audio, video, svg, and canvas. The img, audio, and video elements are used to reference external media, while the svg and canvas elements allow for creation of graphics directly within HTML.

I found the use of the svg and canvas elements to be particularly interesting. The svg element allows for powerful and flexible graphics rendering within HTML, and can be animated using JavaScript and CSS. The canvas element also enables 2D drawing and animation, but requires JavaScript support. The possibilities for visualizations with these elements are virtually endless, making them a valuable tool for web developers.

Overall, I learned about the different options for adding media to a web page and the benefits and limitations of each.

*Codepen Link: [A Tour of Africa](https://codepen.io/wpendl99/pen/ZEjwrav)*

#### Daniel Yu Learned:
Embedding both internal dynamic and external content is key to providing any other media other than text. I'm curious about how involved embedding dynamic content from an external source is, and if you are the one providing the external content, how you need to build your website and webserver to correctly and seamlessly integrate with other people's uses of your content. People embed YouTube viewers, which don't present video media with the same player as everything else, so I wonder how that is done and what the source site can see about its content's use on other platforms or sites.

[Back to top](#top)
<a id='html-website'></a>
## HTML Website
#### William Pendleton Learned:
In this assignment, the task was to create a personal HTML website and deploy it on out server. The process involved verifying that the server is running, forking and cloning a repository containing the required files, personalizing the HTML template, replacing an image, and deploying the website using a shell script. The script utilized the secure copy (scp) command to transfer files to the server's public_html directory where the web server looks for static pages to host. We then verified the website was successfully deployed by accessing it through a browser. 

What I found interesting about this assignment was the utilization of a shell script to deploy the website. It demonstrated how automation can make the process of deploying a website much easier and more efficient. Additionally, having a personal website as a portfolio to showcase projects and assignments completed in the class can be a valuable asset for demonstrating skills and knowledge to others.

*Website Link: [William Pendleton HTML Website](https://worldexcursions.click)*

#### Daniel Yu Learned:


[Back to top](#top)
<a id='simon-html'></a>
## Simon HTML
#### William Pendleton Learned:
In this assignment, I demonstrated my ability to use basic HTML elements such as structure, formatting, input, output, links, and drawing to build a Simon game application. The application has a login page, game play page, high scores page, and about page, each with a header for navigation and a footer that references the source repository.

To complete this assignment, I:
- Reviewed the code for the example Simon HTML application
- Cloned the repository to my development environment
- Created my own version of the Simon application, focusing on understanding the concepts from the example project
- Set the footer link to point to my own code repository
- Committed and pushed my code to my repository multiple times as I hit milestones
- Deployed my code to my production environment using the deployFiles.sh script
- Updated my startup repository README.md to reflect on what I learned
- Submitted the URL of my production environment for grading.

Through this assignment, I learned how to:
- Create multiple HTML pages connected with hyperlinks
- Properly use HTML structural elements, header elements, and doctype
- Use Git to commit and push code to a repository
- Deploy code to a production environment using a script

I am now more confident in my ability to build basic HTML applications and manage their code using Git and deployment scripts.

*Website Link: [Simon HTML (wkp23)](https://simon.worldexcursions.click/archive/v1)*

#### Daniel Yu Learned:


[Back to top](#top)
<a id='css-practice'></a>
## CSS Practice
#### William Pendleton Learned:
The HTML and CSS code I provided demonstrated several fundamental concepts and techniques I recently learned in web development, such as:

- Selectors: CSS selectors are used to target specific HTML elements and apply styles to them. In the example I provided, various selectors were used to target different elements, such as the nav element, the ul element, and the a element.
- Declarations: CSS declarations are used to define the styles to be applied to the targeted elements. Declarations consist of a property and a value, such as color: #fff or font-size: 16px.
- Layout: The CSS box model and layout techniques were used to control the position and size of the elements on the page. The display property was used to specify whether elements should be block-level or inline, and the position property was used to control the positioning of elements.
- Responsive design & Animation: The @media rule was used to define styles that apply only when the screen size is below a certain width, allowing the page to be responsive to different screen sizes and the :hover selector enabled it to be animated while the user was using the website.

*Codepen Link: [CSS Practice](https://codepen.io/wpendl99/pen/XWPWbgG)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='css-flex'></a>
## CSS Flex
#### William Pendleton Learned:
The process of creating a fully responsive application using media queries was a really interesting and eye-opening experience. One of the things that stood out to me the most was how much control I had over the design and layout of my application for different screen sizes. By using media queries to adjust the styles and positioning of various elements, I was able to ensure that my application looked great and functioned properly on a wide range of devices, from smartphones to large desktop monitors.

Another thing I found fascinating was how the use of media queries allowed me to create a consistent and cohesive user experience across all devices. By tailoring the design to fit the unique constraints of each screen size, I was able to make sure that the content was easily accessible and readable no matter what device a user was accessing it from. This not only improved the usability and accessibility of my application, but it also helped to establish trust and credibility with my users, who could rely on a consistent and reliable experience no matter where they were accessing my application from. Overall, I found the process of building a fully responsive application with media queries to be a challenging but highly rewarding experience, and one that has given me a greater appreciation for the importance of designing with a mobile-first mindset.

*Codepen Link: [My Photo Gallery](https://codepen.io/wpendl99/pen/dyqPzYd)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='css-frameworks'></a>
## CSS Frameworks
#### William Pendleton Learned:
During my assignment on Bootstrap, I had the opportunity to experiment with different Bootstrap components such as badges, breadcrumbs, buttons, and dropdowns, and I found this to be a lot of fun. These components are essential UI elements that can enhance the user experience of a website, and it was great to see that I took the time to explore how they work within the Bootstrap framework.

In addition, I found the Tailwind CSS Framework to be cool, which indicates my interest in exploring different CSS frameworks. By experimenting with different frameworks and exploring various components, I am taking important steps towards becoming a more skilled and versatile developer.

Overall, the process of building a simple home page with Bootstrap was an engaging and enjoyable experience for me, and it's exciting to see that I have a passion for learning about different frameworks and exploring various components to create a better user experience for websites.

*Codepen Link: [CSS Bootstrap](https://codepen.io/wpendl99/pen/PodqvNM)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='simon-css'></a>
## Simon CSS
#### William Pendleton Learned:
By incorporating CSS and Bootstrap into my Simon game, I was able to create a visually appealing and responsive design that improved the overall look and feel of the application, making it more user-friendly. I also gained experience with structuring CSS files, modifying code, and experimenting with changes to see their effects. Although bootstrap has been fun to learn, I'm excited to explore other frameworks like Tailwind CSS and think that my startup project would be a great way to work on implementing those frameworks. This assignment helped me to better understand how to use CSS and Bootstrap to enhance the design and user experience of a web application, and I'm looking forward to continuing to build on this knowledge in future projects.

*Website Link: [Simon CSS (wkp23)](https://simon.worldexcursions.click)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='ux-design'></a>
## UX Design
#### William Pendleton Learned:
I designed to do my assignemnt on airbnb's website.

One of the things that people tend to appreciate about Airbnb's UX design is how intuitive and easy it is to use. The homepage has a clear call to action that prompts users to begin searching for accommodations, and the search results page is well-organized and easy to navigate. The use of high-quality photos and a clean, uncluttered design also helps to create a positive user experience.

In addition, Airbnb's UX design is highly effective at providing relevant information to users. For example, the search results page shows important details about each listing, such as price, location, and reviews from previous guests. This makes it easy for users to quickly evaluate whether a particular listing is a good fit for their needs.

Overall, Airbnb's UX design is a great example of how to create a user-friendly and visually appealing web interface that effectively meets the needs of its users.

*Website Link: [airbnb](https://www.airbnb.com)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-TOCL'></a>
## JavaScript Types, Operators, Conditionals, and Loops
#### William Pendleton Learned:
I found it interesting how the for loop and conditional statement work together to generate a random password of the user's desired length, while also ensuring that the user input is valid. The use of Math.random() and Math.floor() to select a random index from the allowed characters is also a clever technique that simplifies the code for generating random strings.

*Website Link: [Random Password Generator](https://codepen.io/wpendl99/pen/bGxeNPj)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-functions'></a>
## JavaScript Functions
#### William Pendleton Learned:
I found it interesting how this assignment combines various types of functions in JavaScript, including standard, inner, and anonymous functions. The use of an inner function to update the count display adds an extra layer of encapsulation, which makes the code more modular and easier to maintain. The anonymous function that adds event listeners to the buttons also demonstrates how JavaScript allows functions to be used as values and passed around as arguments, which is a powerful feature of the language. Overall, this assignment provides a good example of how to use different types of functions to create a responsive and modular web application.

*Website Link: [Counting with JS](https://codepen.io/wpendl99/pen/MWqjvrX)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-arrow-functions'></a>
## JavaScript Arrow Functions
#### William Pendleton Learned:
Something interesting thing about this assignment is that it demonstrates how the arrow function syntax can be used to create compact and readable code for event listeners. Instead of defining a named function and passing it as a parameter to the addEventListener method, we can define an arrow function inline with the addEventListener method call. This helps to reduce clutter and make the code more concise. Additionally, because arrow functions inherit the this pointer from the surrounding scope, we don't need to use bind or call to maintain the correct value of this inside the function body.

*Website Link: [To-Do List](https://codepen.io/wpendl99/pen/MWqjvGX)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-arrays'></a>
## JavaScript Arrays
#### William Pendleton Learned:
One aspect that stood out to me while I was doing this assignment was how when you combine several of the array methods you are able to manipulate JavaScript arrays in many ways, and I used it to create a simple but useful Grocery List application. For example, the tasks array is used to store the list of tasks, while the renderTasks() function uses the forEach() method to iterate over the tasks array and create a new DOM element for each task, with a "Delete" button that uses the splice() method to remove the task from the tasks array. Additionally, the addTask() function uses the push() method to add new tasks to the tasks array, and the input and addBtn elements are used to handle user input and trigger the addTask() function. All in all, this assignment demonstrates how powerful and versatile arrays and object functions can be in building interactive web applications.

*Website Link: [Grocery List 2.0](https://codepen.io/wpendl99/pen/ExegvOJ)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-objects-classes'></a>
## JavaScript Objects and Classes
#### William Pendleton Learned:
One interesting aspect of this assignment that I implement into my example was the use of object constructors, and I used it to create Book objects in a CodePen that creates a table of My Favorite Books. Using object constructors allows us to create multiple Book objects with similar properties and methods without having to write repetitive code. This is a useful concept to understand because it helps to simplify our code and make it more efficient. Additionally, it allows us to work with complex data structures that can be easily updated and maintained.

*Website Link: [My Favorite Books](https://codepen.io/wpendl99/pen/dyqpzBG)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-regex'></a>
## JavaScript Regular Expressions
#### William Pendleton Learned:
One thing I find interesting about regular expressions is their expressiveness and conciseness. With regular expressions, you can define complex patterns for matching and manipulating text with just a few characters. This allows you to perform powerful text processing tasks in a very efficient and compact way. Regular expressions also provide a standardized way to work with text patterns across different programming languages and tools, which makes them a useful tool for data exchange and interoperability. Additionally, regular expressions can be a powerful tool for data validation and input checking, allowing you to enforce specific formatting and input requirements on user input.

*Website Link: [Email Validator](https://codepen.io/wpendl99/pen/MWqpEGX)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-rest-spread'></a>
## JavaScript Rest and Spread
#### William Pendleton Learned:
One thing that I find interesting about rest and spread in JavaScript is how they can simplify code that deals with arrays and objects.

With the spread syntax, we can easily concatenate arrays, clone arrays, and merge objects with one-line code. This can help make our code more concise and easier to read.

On the other hand, rest parameters allow us to define functions that can accept an arbitrary number of arguments, which can be useful in situations where we don't know how many arguments will be passed to a function. This can help us write more flexible and reusable code.

*Website Link: [Shopping Cart](https://codepen.io/wpendl99/pen/NWLpaOw)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-destructuring'></a>
## JavaScript Destructuring
#### William Pendleton Learned:
One thing that I find interesting about destructuring in JavaScript is how it allows us to easily extract and assign values from arrays and objects.

With array destructuring, we can assign individual values from an array to separate variables in a single line of code. This can help make our code more concise and readable, especially when working with large arrays.

Object destructuring allows us to extract values from objects and assign them to variables with the same name as the object's properties. We can also use object destructuring to extract values from nested objects and rename variables to avoid naming conflicts.

Destructuring can also be used to provide default values for variables in case a value is undefined or null. This can help prevent errors and improve the robustness of our code.

*Website Link: [Array and Object Destructuring Example](https://codepen.io/wpendl99/pen/oNPZoNb)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-exceptions'></a>
## JavaScript Exceptions
#### William Pendleton Learned:
One thing that I found interesting about this assignment is the way that exception handling can be used to make web applications more robust and user-friendly. By using try-catch blocks to handle errors, we can catch exceptions that might otherwise crash the application or confuse the user, and display helpful error messages instead. This can improve the user experience and make the application more resilient to unexpected inputs or server errors.

*Website Link: [Exception Handling Example](https://codepen.io/wpendl99/pen/OJopvRz)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-dom'></a>
## JavaScript DOM
#### William Pendleton Learned:
One thing I found interesting about this assignment is how it combines multiple concepts in web development, including DOM manipulation, event handling, and color manipulation. By using JavaScript to manipulate the DOM, we can dynamically update the content and appearance of a web page in response to user interactions. And by using color manipulation algorithms to determine whether a color is light or dark, we can make further decisions about how to style the page elements. Overall, this assignment showcases the versatility and power of web development technologies, and how they can be combined in creative and engaging ways to create dynamic and interactive web pages.

*Website Link: [Hello Color!](https://codepen.io/wpendl99/pen/wvEJmyx)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-promises'></a>
## JavaScript Promises
#### William Pendleton Learned:
One thing that I found interesting about this assignment is how Promises can be used to simplify asynchronous programming in JavaScript. Promises provide a cleaner and more elegant way to handle asynchronous tasks by allowing developers to chain together operations using the then and catch methods, which makes the code more readable and easier to reason about. Overall, Promises are a powerful tool that can greatly improve the quality and maintainability of asynchronous code in JavaScript.

*Website Link: [Promise Example](https://codepen.io/wpendl99/pen/qBMmevx)*

#### Daniel Yu Learned:

[Back to top](#top)
<a id='js-async-await'></a>
## JavaScript async/await
#### William Pendleton Learned:
One thing that I found interesting about this assignment is how async and await can simplify the process of writing asynchronous code in JavaScript. With async and await, developers can write code that looks synchronous, but still executes asynchronously under the hood. This makes it easier to reason about the code, and can help to prevent some of the common pitfalls of asynchronous programming.

*Website Link: [Async/Await Example](https://codepen.io/wpendl99/pen/rNZwBxz)*

#### Daniel Yu Learned:

[Back to top](#top)
