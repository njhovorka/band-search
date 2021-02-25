# Musicfox Band Search

This project implements React, Node, and Express to create a search application through a list of band names. 

Programmed by: Nikoli Hovorka

Project issued by: Musicfox.io


## Setup

- Clone the repository: `git clone https://github.com/njhovorka/band-search.git`. 
- Ensure ports `3000` and `8080` are free for allocation locally.
- In the terminal, navigate to the `band-search` repo. Then run `npm start`.
- In another terminal window, run `node server.js`
- Access the application via `https://localhost:3000`.

## Technical Write-up

There exist many algorithms through which the similarity of two strings may be determined. Since this similarity is the essential 'scoring' method for band names against the entered query, I evaluated several methods to determine an appropriate fit (note: though some were already known, I discovered a concise article chronicling the most popular and effective algorithms currently employed: https://itnext.io/string-similarity-the-basic-know-your-algorithms-guide-3de3d7346227). 

A popular algorithmic subtype relating to this problem is dubbed 'edit-based'; i.e., the number of changes that would be made to a string to convert it into the string it is compared against. All of these algorithms (Levenshtein is among the chief of these) seemed too temporally complex to implement, especially with regards to the findings of several scholarly papers that showed less-than-profound accuracy superiority to the algorithm that was selected - Soreneson-Dice. Sorenson-Dice falls into the 'token-based' subset of similarity algorithms that simply find the amount of matching characters and/or substrings, or 'tokens' in two comparable strings. The simplicity of this algorithm, coupled by an open-source npm library that already implemented this calculation, became the driving motivators for my selection of this algorithm. 

Finally, some modification was given to the library's key algorithmic function to place a higher weight on strings whose first few characters aligned with ther search query - this is made under the assumption that many users simply type the first few characters of an artist and search assuming to find predicitive results. For example, if one types 'ibi' into the search query, 'Ibis Rupturing' should have a higher match ranking than 'Alibi', when through the normal coefficient calculation the opposite would be true. 
