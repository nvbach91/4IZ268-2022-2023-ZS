package cz.podj06.pidboard.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Value("${security.username}")
    private String username;
    @Value("${security.password}")
    private String password;

    @Bean
    public UserDetailsService userDetailsService() {
        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(userBuilder.username(username).password(password).roles("ADMIN").build());

        return manager;
    }

    @Bean
    public SecurityFilterChain apiPermissions(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf()
                .disable()
                .cors()
                .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
                .authorizeRequests()
                .antMatchers("/control", "/control/**")
                .hasRole("ADMIN")
                .anyRequest()
                .permitAll()
                .and()
                .httpBasic(Customizer.withDefaults());

        return httpSecurity.build();
    }
}
