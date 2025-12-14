@props(['domain', 'path' => '', 'target' => '_blank', 'class' => '', 'id' => ''])

<a 
	@if($id) id="{{ $id }}" @endif
	href="{{ domain_url($domain, $path) }}" 
	target="{{ $target }}" 
	@if($class) class="{{ $class }}" @endif
	{{ $attributes }}
>
	{{ $slot }}
</a>
