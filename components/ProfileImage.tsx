import Image from 'next/image'

export default function ProfileImage() {
    return (
        <Image
            src="/images/elbert.jpg"
            alt="Picture of Elbert Cheng"
            width={300}
            height={300}
            style={{
                borderRadius: '50%'
            }}
        />
    )
}