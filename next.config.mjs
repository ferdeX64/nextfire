/** @type {import('next').NextConfig} */
const nextConfig = {


    async redirects(){
        return [
            {
                source:"/",
                destination:"/personas",
                permanent:true

            }
        ]
    }
};

export default nextConfig;
