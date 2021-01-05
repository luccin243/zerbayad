

export const ChangeMetaTags = (title,description, keywords) => {
    document.title = title
    document.getElementsByTagName("META")[1].content = description
    document.getElementsByTagName("META")[2].content = keywords
}


