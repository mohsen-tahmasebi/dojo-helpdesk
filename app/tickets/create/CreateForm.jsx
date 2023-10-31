'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateForm() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const [ticket, setTicket] = useState({ title: '', body: '', priority: 'low' })
	const { title, body, priority } = ticket

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		const newTicket = {
			...ticket,
			user_email: 'mario@netninja.dev',
		}

		const res = await fetch('http://localhost:4000/tickets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newTicket),
		})

		if (res.status === 201) {
			router.refresh()
			router.push('/tickets')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-1/2">
			<label>
				<span>Title:</span>
				<input
					required
					type="text"
					onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
					value={title}
				/>
			</label>
			<label>
				<span>Body:</span>
				<textarea
					required
					onChange={(e) => setTicket({ ...ticket, body: e.target.value })}
					value={body}
				/>
			</label>
			<label>
				<span>Priority:</span>
				<select
					onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
					value={priority}
				>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
			</label>
			<button className="btn-primary" disabled={isLoading}>
				{isLoading && <span>Adding...</span>}
				{!isLoading && <span>Add Ticket</span>}
			</button>
		</form>
	)
}
