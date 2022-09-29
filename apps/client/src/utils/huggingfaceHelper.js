import axios from 'axios'

export const invokeInference = async (model, data) => {
  const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN

  try {
    const resp = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )
    const result = await resp.data
    return result
  } catch (error) {
    console.error(error)
    return { error: JSON.stringify(error) }
  }
}
