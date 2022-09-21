import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, FormGroup, Button, Input, Label } from 'reactstrap'
import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'

const Index = () => {
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) router.push('/admin-login')
    }, [])

    return <div>admin side baby</div>
}

export default Index
