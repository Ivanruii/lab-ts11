const elements = {
    inputText: getElementOrThrow<HTMLTextAreaElement>('input-text', HTMLTextAreaElement),
    extractButton: getElementOrThrow<HTMLButtonElement>('extract-button', HTMLButtonElement),
    resultDiv: getElementOrThrow<HTMLDivElement>('image-links', HTMLDivElement),
}

function getElementOrThrow<T extends HTMLElement>(elementId: string, elementType: new () => T): T {
    const element = document.getElementById(elementId);

    if (!element || !(element instanceof elementType)) {
        throw new Error(`Element with id "${elementId}" not found.`);
    }

    return element;
}

function extractImageLinks(text: string): string[] {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;

    const imageLinks: string[] = [];
    let match;

    while ((match = imgRegex.exec(text)) !== null) {
        const imageLink = match[1];
        imageLinks.push(imageLink);
    }

    return imageLinks;
}

function createImageContainer(imageLinks: string[]) {
    if (imageLinks.length > 0) {
        for (let i = 0; i < imageLinks.length; i++) {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
        
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
        
            const image = document.createElement("img");
            image.src = imageLinks[i];
            image.alt = "Imagen";
        
            const link = document.createElement("a");
            link.href = imageLinks[i];
            link.textContent = "Abrir imágen";
        
            imageContainer.appendChild(image);
            resultItem.appendChild(imageContainer);
            resultItem.appendChild(link);
        
            elements.resultDiv.appendChild(resultItem);
        }
        
    } else {
        elements.resultDiv.innerHTML += "<p>No se encontraron enlaces de imágenes.</p>";
    }
}

function handleExtractButtonClick() {
    const text = elements.inputText.value;
    const imageLinks = extractImageLinks(text);
    createImageContainer(imageLinks);
}

elements.extractButton.addEventListener("click", handleExtractButtonClick);
