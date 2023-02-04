<a id='top'></a>
# BYU-CS260 Notes
## Assignement Write-up Quick Links:
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

<details>
  <summary>🚧 Assignments that are not yet completed</summary>
  <br>
 
  - [HTML Media](#html-media)
  - [HTML Website](#html-website)
  - [Simon HTML](#simon-html)
- [CSS Practice](#css-practice)
  - [CSS Flex](#css-flex)
  - [CSS Frameworks](#css-frameworks)
  - [Simon CSS](#simon-css)
- [UX Desgin](#ux-design)
- [Startup - HTML, CSS](#startup-html-css)
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

#### Daniel Yu Learned:

[Back to top](#top)
<a id='html-structure'></a>
## HTML Structure
#### William Pendleton Learned:
In this assignment, I learned about HTML structure elements and their distinction between block and inline elements. The purpose of HTML is to provide structure and content to web applications, and common HTML structural elements include body, header, footer, main, section, aside, p, table, ol/ul, div, and span. Proper representation of the page structure using these elements is important for logical sense and for automated tools like search indexing crawlers and accessibility screen readers to correctly interpret the document. Block elements are meant to be distinct blocks in the flow of content, while inline elements are meant to be inline with the content flow of block elements. For example, a div block element could have an inline b element to bring attention to a portion of its sub-text, while a p element could have a span to mark the sub-text as a person's name.

#### Daniel Yu Learned:

[Back to top](#top)
<a id='html-input'></a>
## HTML Input
#### William Pendleton Learned:
HTML inputs allow for user input on a website or web application. There are several types of inputs, including text inputs, checkboxes, radio buttons, drop-down menus, and submit buttons. HTML inputs are essential for collecting data from users, and they play a crucial role in web development.

One interesting aspect of HTML inputs is the versatility they offer in terms of data collection. Different input types cater to specific data requirements, and developers can choose the type that best fits their needs. For instance, a drop-down menu is ideal for offering a limited number of choices, while a text input allows for free-form data entry.

#### Daniel Yu Learned:

[Back to top](#top)
