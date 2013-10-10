asparagus
=========

asparagus is a content management and generative typography framework written in HTML and Node.js
It is the open-source workhorse and brains behind [American Asparagus](http://americanasparagus.org).

## QuickStart ##
asparagus requires that you have [Node.js](http://nodejs.org) (>= 0.10.0) and [CouchDb](http://couchdb.apache.org/) (>=1.4.0) installed on your system
To get started with a quick example, clone the repo,

```
$ git clone https://github.com/drewsynan/asparagus
```

cd into the asparagus directory and install the dependencies


```
$ cd asparagus && npm install
```

and launch the app


```
$ node app.js
```

Point your browser to ```localhost:8080``` to view the results

## What is generative typography? ##
Generative typography is the use of computers, and/or algorithms to create letterforms and visual compositions of letter
forms. Conceptually, asparagus was influenced by the work of swiss typographer Karl Gerstner, who began experimenting with
[using computers](http://www.lars-mueller-publishers.com/en/programme-entwerfen) to design grid systems and compositions (typographic and [otherwise](http://www.amazon.com/Karl-Gerstner-Chapters-Constructive-Pictures/dp/3775791515)) in the 1950s and 1960s.

While Gerstner used what could be thought of as a deterministic approach to generative design (meaning he used equations and programs with pre-defined parameters that would reliably produce the same results each time they were computed), asparagus takes a non-deterministic and probabilistic approach.

Asparagus's parameters are not determined beforehand. They are randomly generated, and then selected and refined by user
interaction. This means each time the program is run, the "solution" found is unique. Moreover, there is no "correct"
solution, or end result. Much as organisms react to the environment and events around them asparagus takes the chaos
in its web-environment and reacts and adapts.

## How does asparagus work? ##
Asparagus uses [genetic algorithms](http://en.wikipedia.org/wiki/Genetic_algorithm) to determine page layout. Each design parameter (font, color, paragraph margin) is encoded into a single long string of ones and zeros (called the chromosome). Chromosomes are initially filled with completely random junk (this random group is known as generation 0), but slowly develop and stabalize into specific (if non-deterministic) design solutions.

As people interact with the pages created from the chromosomes, each chromosome is given a score by a [fitness function](http://en.wikipedia.org/wiki/Fitness_function). Pages that they seem to like and interact with better have a higher score. Once all of the "individuals" (all of the chromosomes) in generation 0 have been scored, probabilities based on the fitness (as a proportion of the total fitness of the generation) are assigned to each individual, and based on these probabilities pairs of individuals are selected to reproduce.

As in nature, the individuals reproducing divide and swap their genetic information (portions of the ones and zeros making up the design code) to create a new child individual. (As an example, a new page may inherit type size and margin settings from one parent and type color and leading information from the other.) When enough children have been made, a new generation is sent out into the big world wide web, and the selection and reproduction process repeats.

When a user loads a page, a chromosome is sent from the server. The client then transcribes the genome into [CSS](http://en.wikipedia.org/wiki/Cascading_Style_Sheets) rules that are applied to the page. The user sends back information about their interactions with the page, and the chromosome is scored accordingly.

### Show me a chromosome ###

```
011010000111111110000110010110101110000111010111000101110010011010011010000110001111101111110110100010001000010100100100010100011101000011110000100110111001110111000100000101111001000110001100101111110011101100110100000101011011010110101100110100110111111110100101010011101000100110001011000011001011100111011100111001110101000111001011010001000101001011110001101110110011011111000011001100001110110110101101101100110010110110000111100011001111110010001111011101111100011101011110001101000011110110010010101011110101001000001110010010110110110111001010010010010011110111010101111010100011011110010011010011111110010100111011010111101001001010101110000110101000111110110011111000110011111100010011010011000010011110110011101101011111110001001001000100000111000111100110111001011100000100100011110001010111111001101011111001010011111100011110111100101110101010100110010101100100010011001101100011101001110110110001010011011000110001001110100000101111011101100111110110111100001010100110001000011000110110100001010101001011111001000011000010101011001111100111000111100000110111110011011110111011111100001001110010010001111110110100011011000100110001000111100110001101010011111100101011010001011110011110011110000110011100101100111110110001110011001001010101100111111001011101100001010010010101101100011001111111111110100110010100101001111110000101101111001010101000010011101111010001010110010011011110110100000011101100110001111101001110100101100100001000011100010010111111111111111111110101101000001010111101111100011110110111000110010111000100001011100100110001111101101001110000100001110000111000001011010000011110100011110110110000010011101111010111101110010100100010010001001000011110100111100100111000110001111001011100010110101010011111111000100001101100010101000101110001100101110010001011010011000110101110010101110101111110001110011000001101001010110011010001011111110011111000101011001000111111000101010101010010010011011110010001000001110101011111110110011010011100111110111000010001010010111001011001100101010000100111000101111110000110011101110110111100110110101011010001000101100100000100110010101000110001010100111110111011111000110100010110110001100011101111110011000010111100100111100111100100010010101110011111101100111110010011101101100111100111000010010000011010101110100110011000111100111110010110010011011011110110000001010100100100100111011010100110001000100110011011101110010010011010000100010000111101101110111110100010001011001000011011101011
```

(lol what did u expect)

## why? ##
Asparagus was created in part to make it easier for designers and artists to create generative typographic works on the web.
Additionally, asparagus addresses questions of generative document design in addition to generative typography. A great many
of the generative typographic projects and toolkits on and for the web today focus on display text rather than on document and text design as a whole; asparagus focuses on these aspects of generative design.

Asparagus also allows for a social dimension to the generative process. With the "average chromosome" page, readers can observe the way other users are affecting the chromosomes for the next generation in real time. As each user interaction is
logged into the server, an "average" chromosome is computed and pushed out to any who wish to view it.

Ultimately, asparagus is about a ggiving people a generative design experience, as opposed to a generatively designed object.