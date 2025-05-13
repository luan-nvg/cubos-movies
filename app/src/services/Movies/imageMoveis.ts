import api from "@/api/axios"

/**
 * Creates a new movie with poster image upload
 * @param {Object} data - Movie data
 * @param {File|null} posterFile - The poster image file to upload
 * @returns {Promise<Object|null>} The created movie or null if error
 */
const imageMoveis = async (id, posterFile, name = "profile") => {
  const url = `/image/upload/${id}`

  try {
    // Create a FormData object to handle file upload along with other data
    const formData = new FormData()

    // Add the poster file if provided
    if (posterFile) {
      formData.append(name, posterFile)
    }

    // Set proper headers for multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const response = await api.post(url, formData, config)
    const movie = response?.data
    console.log("Movie image created successfully:", movie)
    return movie
  } catch (error) {
    console.error("API Error:", error)
    throw new Error(
      error.response?.data?.message || "Failed to create image movie"
    )
  }
}

export default imageMoveis
