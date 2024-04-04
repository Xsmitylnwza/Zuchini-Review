function isValidImageFile(filename) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    const extension = filename.split('.').pop().toLowerCase()
    return allowedExtensions.includes(extension)
}

export default isValidImageFile