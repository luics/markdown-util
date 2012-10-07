# Markdown Cheat Sheet <a name="top"></a>

## Contents
* [Header](#header)
* [Link](#link)
* [List](#list)
* [Font](#font)
* [Blockquote](#blockquote)
* [Code](#header)
* [Horizontal Rule](#horizontal)
* [Escape](#escape)

## Header <a name="header"></a>

# Header1
> `# Header1`

### Header3
> `### Header3`

###### Header6
> `###### Header6`

## Link <a name="header"></a>

### Normal Link
[text link](http://example.com "Optional Tilte")
> `[text link](http://example.com "Optional  Tilte")`

![image](http://daringfireball.net/favicon.ico "Optional Title")
> `![image](http://daringfireball.net/favicon.ico "Optional Title")`

### Reference-style Link
I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

> I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].
\[1\]: http://google.com/        "Google"
\[2\]: http://search.yahoo.com/  "Yahoo Search"
\[3\]: http://search.msn.com/    "MSN Search"

## List <a name="list"></a>

* item0
* item1
* item2

`*` or `-` or `+` as leading char.

> `* item0
* item1
* item2`

1. item0
2. item1
3. item2

> `1. item0
   2. item1
   3. item2`

## Font <a name="font"></a>

*Italic*
> `*Italic*`

**Bold**
> `**Bold**`

***Bold & Italic***
> `***Bold & Italic***`

## Blockquote <a name="blockquote"></a>

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> > This is nested blockquote.

Single line or multi lines.
> `> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.`
> `> > This is nested blockquote.`

## Code <a name="code"></a>

### Basic Code

    js code

4 leading whitespace.
> &nbsp;&nbsp;&nbsp;&nbsp;`js ocde`

### Code highlight

```javascript
var hi = 'hi';  
console.log(hi);
```

Supported in [github-flavored-markdown](https://github.com/mojombo/github-flavored-markdown)

> \`\`\`javascript
var hi = 'hi';
console.log(hi);
\`\`\`

## Horizontal Rule <a name="horizontal"></a>

* * *

`*` or `-` is ok.

> `* * *`

***

> `***`

*****

> `*****`


## Escape <a name="escape"></a>

- \`   backtick
- \*   asterisk
- \#   hash mark
- [More..](http://daringfireball.net/projects/markdown/syntax#backslash)


