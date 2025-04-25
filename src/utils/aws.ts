import { S3 } from 'aws-sdk'


export async function uploadImages() {
    return new Promise((resolve, reject) => {
        try {

            const s3 = new S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY
            })
            console.log(`logging s3:`, s3)

        } catch (err) {
            reject(err)
        }
    })
}